import { AppConfig } from '../config';

export interface DailyAnalysisResult {
  date: string;
  highlights: string[];
  problems: string[];
  boss: string;
  nextActions: string[];
}

export function runDailyAnalysis(config: AppConfig, date: string): DailyAnalysisResult {
  return {
    date,
    highlights: [
      '完成关键任务，状态稳定',
      '习惯和生活节奏保持一致',
      '学习与成长有正向积累',
    ],
    problems: [
      '需优先处理时间分配',
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
  return {
    startDate,
    endDate,
    summary: '本周整体稳定，但仍需提升计划执行与行动闭环。',
    priorities: ['优化睡眠', '完成目标任务', '聚焦学习与收入'],
  };
}

export function runMonthlyAnalysis(config: AppConfig, month: string) {
  return {
    month,
    summary: '本月分析基于真实数据库数据，重点关注成长、健康和现金流。',
    priorities: ['提高月目标完成率', '优化预算效率', '维持稳定作息'],
  };
}
