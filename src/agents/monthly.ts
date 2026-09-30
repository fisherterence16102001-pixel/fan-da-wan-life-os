import { AppConfig } from '../config';
import { runWeeklyAnalysis } from './analysis';

export function runWeeklyAgent(config: AppConfig): ReturnType<typeof runWeeklyAnalysis> {
  const start = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const end = new Date().toISOString().slice(0, 10);
  return runWeeklyAnalysis(config, start, end);
}
