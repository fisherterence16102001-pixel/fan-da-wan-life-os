import { Client } from '@notionhq/client';
import { AppConfig } from '../config';
import { createLogger } from '../logger';
import { initializeDatabaseSystem } from './client';

export async function syncNotionSystem(client: Client, config: AppConfig): Promise<Record<string, string>> {
  const logger = createLogger(config.logLevel);
  logger.info('Synchronizing Notion Life OS databases...');
  return initializeDatabaseSystem(client, config);
}
