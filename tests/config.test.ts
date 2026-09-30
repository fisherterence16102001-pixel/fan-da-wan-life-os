#!/usr/bin/env node
import { Client } from '@notionhq/client';
import * as process from 'process';
import { loadEnv } from './config';
import { createLogger } from './logger';
import { initializeNotionSystem } from './notion/schema';
import { runDailyAnalysis, runMonthlyAnalysis, runWeeklyAnalysis } from './agents/analysis';

async function main(): Promise<void> {
  const config = loadEnv();
  const logger = createLogger(config.logLevel);

  logger.info(`Starting ${config.appName} (${config.appNameEn})`);

  const client = new Client({ auth: config.notionToken });

  const args = process.argv.slice(2);
  const command = args[0] ?? 'init';

  if (command === 'init') {
    await initializeNotionSystem(client, config);
    return;
  }

  if (command === 'sync') {
    const ids = await initializeNotionSystem(client, config);
    logger.info(`Sync complete. IDs: ${JSON.stringify(ids)}`);
    return;
  }

  if (command === 'agent') {
    const agentType = args[1] ?? 'daily';
    const today = new Date().toISOString().slice(0, 10);

    if (agentType === 'daily') {
      const result = runDailyAnalysis(config, today);
      logger.info(`Daily agent result: ${JSON.stringify(result)}`);
      return;
    }

    if (agentType === 'weekly') {
      const result = runWeeklyAnalysis(config, '2026-09-24', '2026-09-30');
      logger.info(`Weekly agent result: ${JSON.stringify(result)}`);
      return;
    }

    if (agentType === 'monthly') {
      const result = runMonthlyAnalysis(config, '2026-09');
      logger.info(`Monthly agent result: ${JSON.stringify(result)}`);
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
