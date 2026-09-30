import { AppConfig } from '../config';
import { runMonthlyAnalysis } from './analysis';

export function runMonthlyAgent(config: AppConfig): ReturnType<typeof runMonthlyAnalysis> {
  const month = new Date().toISOString().slice(0, 7);
  return runMonthlyAnalysis(config, month);
}
