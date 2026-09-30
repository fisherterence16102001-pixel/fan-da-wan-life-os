import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

export const DEFAULT_CACHE_FILE = '.notion-cache.json';

export interface AppConfig {
  notionToken: string;
  parentPageId: string;
  appName: string;
  appNameEn: string;
  dryRun: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  rateLimitDelayMs: number;
  cacheFile: string;
}

export function loadEnv(): AppConfig {
  dotenv.config();

  const notionToken = process.env.NOTION_TOKEN ?? '';
  const parentPageId = process.env.PARENT_PAGE_ID ?? '';
  const appName = process.env.APP_NAME ?? '饭大碗的游戏人生';
  const appNameEn = process.env.APP_NAME_EN ?? 'FAN DA WAN LIFE OS';
  const dryRun = (process.env.DRY_RUN ?? 'false').toLowerCase() === 'true';
  const logLevel = (process.env.LOG_LEVEL ?? 'info') as AppConfig['logLevel'];
  const rateLimitDelayMs = Number(process.env.RATE_LIMIT_DELAY_MS ?? '250');
  const cacheFile = process.env.CACHE_FILE ?? DEFAULT_CACHE_FILE;

  if (!notionToken || !parentPageId) {
    throw new Error('Missing required env vars: NOTION_TOKEN and PARENT_PAGE_ID. Copy .env.example to .env and fill in the values.');
  }

  return {
    notionToken,
    parentPageId,
    appName,
    appNameEn,
    dryRun,
    logLevel,
    rateLimitDelayMs,
    cacheFile,
  };
}

export function resolveCacheFile(cacheFilePath = DEFAULT_CACHE_FILE): string {
  return path.resolve(process.cwd(), cacheFilePath);
}

export function ensureCacheFile(filePath: string): void {
  const resolved = resolveCacheFile(filePath);
  if (!fs.existsSync(resolved)) {
    fs.writeFileSync(resolved, JSON.stringify({}, null, 2), 'utf8');
  }
}
