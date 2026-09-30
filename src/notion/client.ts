import { Client } from '@notionhq/client';
import { databaseSpecs } from './schema';
import { AppConfig, ensureCacheFile, resolveCacheFile } from '../config';
import { createLogger } from '../logger';
import * as fs from 'fs';

export interface CacheMap {
  [key: string]: string;
}

export function readCache(cacheFile: string): CacheMap {
  ensureCacheFile(cacheFile);
  try {
    const raw = fs.readFileSync(resolveCacheFile(cacheFile), 'utf8');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function writeCache(cacheFile: string, data: CacheMap): void {
  ensureCacheFile(cacheFile);
  fs.writeFileSync(resolveCacheFile(cacheFile), JSON.stringify(data, null, 2), 'utf8');
}

export async function searchPagesByTitle(client: Client, title: string): Promise<any[]> {
  const result = await client.search({
    query: title,
    filter: {
      property: 'object',
      value: 'page',
    },
  });

  return (result.results ?? []) as any[];
}

export async function ensureDatabase(client: Client, config: AppConfig, spec: (typeof databaseSpecs)[number]): Promise<string> {
  const logger = createLogger(config.logLevel);
  const cache = readCache(config.cacheFile);
  const cachedId = cache[spec.key];

  if (cachedId) {
    logger.info(`Database ${spec.name} already cached as ${cachedId}`);
    return cachedId;
  }

  const allDatabases = await client.search({
    filter: {
      property: 'object',
      value: 'database',
    },
  });

  const existing = (allDatabases.results ?? []).find((db: any) => db.title?.[0]?.plain_text === spec.name);
  if (existing) {
    cache[spec.key] = existing.id;
    writeCache(config.cacheFile, cache);
    logger.info(`Reused database ${spec.name}: ${existing.id}`);
    return existing.id;
  }

  if (config.dryRun) {
    logger.info(`[DRY RUN] Would create database: ${spec.name}`);
    return `dry-run:${spec.key}`;
  }

  const created = await client.databases.create({
    parent: { type: 'page_id', page_id: config.parentPageId },
    title: [{ type: 'text', text: { content: spec.name } }],
    properties: (await import('./schema')).buildNotionProperties(spec.properties),
  });

  cache[spec.key] = created.id;
  writeCache(config.cacheFile, cache);
  logger.info(`Created database ${spec.name}: ${created.id}`);
  return created.id;
}

export async function ensureDashboard(client: Client, config: AppConfig, title: string, description: string, cards: string[]): Promise<string> {
  const logger = createLogger(config.logLevel);
  const existingPages = await searchPagesByTitle(client, title);
  const found = existingPages.find((page: any) => page.properties?.title?.title?.[0]?.plain_text === title);

  if (found) {
    logger.info(`Dashboard page already exists: ${title} -> ${found.id}`);
    return found.id;
  }

  if (config.dryRun) {
    logger.info(`[DRY RUN] Would create dashboard page: ${title}`);
    return `dry-run:${title}`;
  }

  const page = await client.pages.create({
    parent: { type: 'page_id', page_id: config.parentPageId },
    properties: {
      title: {
        type: 'title',
        title: [{ type: 'text', text: { content: title } }],
      },
    },
    children: [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content: description } }],
        },
      },
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: '核心指标' } }],
        },
      },
      ...cards.map((card) => ({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ type: 'text', text: { content: card } }],
        },
      })),
    ],
  });

  logger.info(`Created dashboard page ${title}: ${page.id}`);
  return page.id;
}

export async function initializeDatabaseSystem(client: Client, config: AppConfig): Promise<Record<string, string>> {
  const logger = createLogger(config.logLevel);
  const ids: Record<string, string> = {};

  for (const database of databaseSpecs) {
    ids[database.key] = await ensureDatabase(client, config, database);
  }

  for (const dashboard of (await import('./schema')).dashboardSpecs) {
    ids[dashboard.key] = await ensureDashboard(client, config, dashboard.title, dashboard.description, dashboard.cards);
  }

  logger.info('Life OS initialization complete.');
  return ids;
}
