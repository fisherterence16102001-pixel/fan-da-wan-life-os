import { describe, expect, it } from '@jest/globals';
import { runDailyAnalysis, runWeeklyAnalysis, runMonthlyAnalysis } from '../src/agents/analysis';
import { loadEnv } from '../src/config';

describe('AI analysis agents', () => {
  it('builds a valid daily analysis result', () => {
    const config = loadEnv();
    const result = runDailyAnalysis(config, '2026-09-30');
    expect(result.date).toBe('2026-09-30');
    expect(result.highlights.length).toBeGreaterThan(0);
    expect(result.nextActions.length).toBeGreaterThan(0);
  });

  it('builds a valid weekly analysis result', () => {
    const config = loadEnv();
    const result = runWeeklyAnalysis(config, '2026-09-24', '2026-09-30');
    expect(result.summary.length).toBeGreaterThan(0);
    expect(result.priorities.length).toBeGreaterThan(0);
  });

  it('builds a valid monthly analysis result', () => {
    const config = loadEnv();
    const result = runMonthlyAnalysis(config, '2026-09');
    expect(result.month).toBe('2026-09');
    expect(result.priorities.length).toBeGreaterThan(0);
  });
});
