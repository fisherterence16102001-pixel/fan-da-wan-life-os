#!/usr/bin/env node
import { Client } from '@notionhq/client';
import { loadEnv } from './config';
import { createLogger } from './logger';
import { createNotionClient } from './notion/client';
import { initializeDatabaseSystem } from './notion/schema';
import { runDailyAgent } from './agents/daily';
import { runWeeklyAgent } from './agents/weekly';
import { runMonthlyAgent } from './agents/monthly';

async function main(): Promise<void> {
  const config = loadEnv();
  const logger = createLogger(config.logLevel);
  const client = createNotionClient(config);

  const args = process.argv.slice(2);
  const command = args[0] ?? 'init';

  logger.info(`Starting ${config.appName} (${config.appNameEn})`);

  if (command === 'init') {
    const ids = await initializeDatabaseSystem(client, config);
    logger.info(`Initialization complete: ${JSON.stringify(ids)}`);
    return;
  }

  if (command === 'sync') {
    const ids = await initializeDatabaseSystem(client, config);
    logger.info(`Sync complete: ${JSON.stringify(ids)}`);
    return;
  }

  if (command === 'agent') {
    const agentType = args[1] ?? 'daily';

    if (agentType === 'daily') {
      logger.info(`Daily agent: ${JSON.stringify(runDailyAgent(config))}`);
      return;
    }

    if (agentType === 'weekly') {
      logger.info(`Weekly agent: ${JSON.stringify(runWeeklyAgent(config))}`);
      return;
    }

    if (agentType === 'monthly') {
      logger.info(`Monthly agent: ${JSON.stringify(runMonthlyAgent(config))}`);
      return;
    }
  }

  logger.warn(`Unknown command: ${command}. Supported commands: init, sync, agent [daily|weekly|monthly]`);
}

main().catch((error: unknown) => {
  const logger = createLogger('error');
  logger.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
