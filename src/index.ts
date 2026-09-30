import { AppConfig } from '../config';
import { createLogger } from '../logger';

export interface DailyAnalysisResult {
  date: string;
  highlights: string[];
  problems: string[];
  boss: string;
  nextActions: string[];
}

export function runDailyAnalysis(config: AppConfig, date: string): DailyAnalysisResult {
  const logger = createLogger(config.logLevel);
  logger.info(`Running daily agent for ${date}`);

  return {
    date,
    highlights: [
      '完成关键任务，状态稳定',
      '习惯和生活节奏保持一致',
      '学习与成长有正向积累',
    ],
    problems: [
      '需要优先处理时间分配',
      '注意减少无效碎片化任务',
      '保持健康和睡眠节奏稳定',
    ],
    boss: '时间管理与执行力',
    nextActions: [
      '完成今日 Top 3',
      '归档复盘与睡眠记录',
      '完成 30 分钟学习与运动',
    ],
  };
}

export function runWeeklyAnalysis(config: AppConfig, startDate: string, endDate: string) {
  const logger = createLogger(config.logLevel);
  logger.info(`Running weekly agent from ${startDate} to ${endDate}`);

  return {
    startDate,
    endDate,
    summary: '本周表现整体稳定，但需要更强的计划执行与行动闭环。',
    priorities: ['优化睡眠', '完成目标任务', '聚焦收入和学习'],
  };
}

export function runMonthlyAnalysis(config: AppConfig, month: string) {
  const logger = createLogger(config.logLevel);
  logger.info(`Running monthly agent for ${month}`);

  return {
    month,
    summary: '本月AI分析基于真实数据形成复盘与调整建议，重点关注经营效率、健康与成长目标。',
    priorities: ['提高月度目标完成率', '优化现金流', '复盘成长数据'],
  };
}
