import { Client } from '@notionhq/client';
import * as fs from 'fs';
import { databaseSpecs, DashboardSpec, dashboardSpecs } from './schema';
import { AppConfig, ensureCacheFile, resolveCacheFile } from '../config';
import { createLogger } from '../logger';

export type NotionPageOrDatabase = { id: string; object: string; properties?: Record<string, any>; title?: Array<{ plain_text?: string }> };

export interface CacheData {
  [key: string]: string;
}

export function readCache(cacheFile: string): CacheData {
  ensureCacheFile(cacheFile);
  try {
    const data = fs.readFileSync(resolveCacheFile(cacheFile), 'utf8');
    return JSON.parse(data || '{}');
  } catch {
    return {};
  }
}

export function writeCache(cacheFile: string, data: CacheData): void {
  ensureCacheFile(cacheFile);
  fs.writeFileSync(resolveCacheFile(cacheFile), JSON.stringify(data, null, 2), 'utf8');
}

export function getDbIdByKey(cacheFile: string, key: string): string | undefined {
  return readCache(cacheFile)[key];
}

export function setDbIdByKey(cacheFile: string, key: string, id: string): void {
  const cache = readCache(cacheFile);
  cache[key] = id;
  writeCache(cacheFile, cache);
}

export function buildDatabaseProperties(specs: any[]): Record<string, any> {
  const properties: Record<string, any> = {};

  for (const field of specs) {
    if (field.type === 'title') {
      properties[field.name] = {
        title: {},
      };
      continue;
    }

    if (field.type === 'rich_text') {
      properties[field.name] = {
        rich_text: {},
      };
      continue;
    }

    if (field.type === 'checkbox') {
      properties[field.name] = {
        checkbox: {},
      };
      continue;
    }

    if (field.type === 'date') {
      properties[field.name] = {
        date: {},
      };
      continue;
    }

    if (field.type === 'url') {
      properties[field.name] = {
        url: {},
      };
      continue;
    }

    if (field.type === 'email') {
      properties[field.name] = {
        email: {},
      };
      continue;
    }

    if (field.type === 'phone_number') {
      properties[field.name] = {
        phone_number: {},
      };
      continue;
    }

    if (field.type === 'files') {
      properties[field.name] = {
        files: {},
      };
      continue;
    }

    if (field.type === 'number') {
      properties[field.name] = {
        number: {
          format: field.format === 'dollar' ? 'dollar' : field.format === 'percent' ? 'percent' : 'number',
        },
      };
      continue;
    }

    if (field.type === 'select') {
      properties[field.name] = {
        select: {
          options: (field.options ?? []).map((option: any) => ({ name: option.name, color: option.color ?? 'default' })),
        },
      };
      continue;
    }

    if (field.type === 'multi_select') {
      properties[field.name] = {
        multi_select: {
          options: (field.options ?? []).map((option: any) => ({ name: option.name, color: option.color ?? 'default' })),
        },
      };
      continue;
    }

    if (field.type === 'relation') {
      properties[field.name] = {
        relation: {
          database_id: field.relationDatabase ?? '',
          synced_property_name: field.relationFieldName ?? field.name,
        },
      };
      continue;
    }

    properties[field.name] = {
      rich_text: {},
    };
  }

  return properties;
}

export function buildDatabaseCreateBody(spec: any, parentPageId: string): any {
  return {
    parent: { type: 'page_id', page_id: parentPageId },
    title: [{ type: 'text', text: { content: spec.name } }],
    properties: buildDatabaseProperties(spec.properties),
  };
}

export function buildDashboardPageBody(title: string, description: string): any {
  return {
    parent: { type: 'page_id', page_id: process.env.PARENT_PAGE_ID ?? '' },
    properties: {
      title: [{ type: 'text', text: { content: title } }],
    },
    children: [
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: description } }] } },
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '核心指标' } }] } },
    ],
  };
}

export async function listDatabases(client: Client): Promise<any[]> {
  const res = await client.search({
    filter: {
      property: 'object',
      value: 'database',
    },
  });
  return (res.results ?? []) as any[];
}

export async function ensureDatabase(client: Client, config: AppConfig, spec: any): Promise<string> {
  const logger = createLogger(config.logLevel);
  const cache = readCache(config.cacheFile);
  const cached = cache[spec.key];

  if (cached) {
    logger.info(`Database ${spec.name} already exists in cache: ${cached}`);
    return cached;
  }

  const all = await listDatabases(client);
  const found = all.find((db: any) => db.title?.[0]?.plain_text === spec.name);

  if (found) {
    setDbIdByKey(config.cacheFile, spec.key, found.id);
    logger.info(`Reused existing database ${spec.name} -> ${found.id}`);
    return found.id;
  }

  if (config.dryRun) {
    logger.info(`[DRY RUN] Would create database: ${spec.name}`);
    return `dry-run:${spec.key}`;
  }

  const response = await client.databases.create(buildDatabaseCreateBody(spec, config.parentPageId));
  setDbIdByKey(config.cacheFile, spec.key, response.id);
  logger.info(`Created database ${spec.name}: ${response.id}`);
  return response.id;
}

export async function ensureDashboardPage(client: Client, config: AppConfig, spec: DashboardSpec): Promise<string> {
  const logger = createLogger(config.logLevel);
  const pageTitle = spec.title;

  const response = await client.search({
    query: pageTitle,
    filter: { property: 'object', value: 'page' },
  });

  const current = (response.results as any[]).find((p: any) => p.properties?.title?.title?.[0]?.plain_text === pageTitle);
  if (current) {
    logger.info(`Dashboard page already exists: ${current.id}`);
    return current.id;
  }

  if (config.dryRun) {
    logger.info(`[DRY RUN] Would create dashboard page: ${pageTitle}`);
    return `dry-run:${pageTitle}`;
  }

  const page = await client.pages.create({
    parent: { type: 'page_id', page_id: config.parentPageId },
    properties: {
      title: {
        type: 'title',
        title: [{ type: 'text', text: { content: pageTitle } }],
      },
    },
    children: [
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: spec.description } }] } },
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '卡片指标' } }] } },
      ...spec.cards.map((card) => ({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ type: 'text', text: { content: card } }],
        },
      })),
    ],
  });

  logger.info(`Created dashboard page ${pageTitle}: ${page.id}`);
  return page.id;
}

export async function initializeNotionSystem(client: Client, config: AppConfig): Promise<Record<string, string>> {
  const logger = createLogger(config.logLevel);
  const ids: Record<string, string> = {};

  for (const database of databaseSpecs) {
    ids[database.key] = await ensureDatabase(client, config, database);
  }

  for (const dashboard of dashboardSpecs) {
    ids[dashboard.key] = await ensureDashboardPage(client, config, dashboard);
  }

  logger.info('Life OS initialization complete.');
  return ids;
}
