import { AppConfig } from '../config';
import { runDailyAnalysis } from './analysis';

export function runDailyAgent(config: AppConfig): ReturnType<typeof runDailyAnalysis> {
  const today = new Date().toISOString().slice(0, 10);
  return runDailyAnalysis(config, today);
}
