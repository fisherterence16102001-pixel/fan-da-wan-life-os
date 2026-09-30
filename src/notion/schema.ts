export type PropertyType =
  | 'title'
  | 'rich_text'
  | 'number'
  | 'date'
  | 'checkbox'
  | 'select'
  | 'multi_select'
  | 'url'
  | 'email'
  | 'phone_number'
  | 'files';

export interface FieldSpec {
  name: string;
  type: PropertyType;
  format?: 'number' | 'dollar' | 'percent';
  options?: Array<{ name: string; color?: string }>;
}

export interface DatabaseSpec {
  key: string;
  name: string;
  description?: string;
  properties: FieldSpec[];
}

export interface DashboardSpec {
  key: string;
  title: string;
  description: string;
  cards: string[];
}

export const dashboardSpecs: DashboardSpec[] = [
  {
    key: 'main-dashboard',
    title: '饭大碗的游戏人生 · 总控台',
    description: '个人生活记录 + 成长 + 财富 + AI Agent 的统一总入口。',
    cards: [
      '今日生活指数',
      '今日 Top 3',
      '今日 Boss Fight',
      '今日习惯',
      '今日睡眠',
      '今日阅读',
      '今日学习',
      '今日运动',
      '今日收入',
      '今日支出',
      '今日电商销售额',
      '今日电商净利润',
      '当前体重',
      '当前体脂',
      '本月目标完成率',
      'XP',
      '当前等级',
      '连续打卡',
      '7日趋势',
      '30日趋势',
      'AI 今日总结',
      'AI 明日建议',
    ],
  },
];

export const databaseSpecs: DatabaseSpec[] = [
  {
    key: 'daily-life-index',
    name: '今日生活指数',
    description: '每天衡量生活指数、趋势和AI总结',
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Life Score', type: 'number', format: 'number' },
      { name: 'Top 3', type: 'rich_text' },
      { name: 'Boss Fight', type: 'rich_text' },
      { name: 'Mood', type: 'select', options: [{ name: '开心' }, { name: '稳定' }, { name: '疲惫' }, { name: '焦虑' }, { name: '充实' }] },
      { name: 'AI Summary', type: 'rich_text' },
      { name: 'AI Suggestion', type: 'rich_text' },
      { name: 'XP', type: 'number', format: 'number' },
      { name: 'Level', type: 'number', format: 'number' },
    ],
  },
  {
    key: 'daily-schedule',
    name: '日程统筹',
    description: '每日日程、时间管理和待办节点',
    properties: [
      { name: 'Task', type: 'title' },
      { name: 'Date', type: 'date' },
      { name: 'Time', type: 'rich_text' },
      { name: 'Tag', type: 'multi_select', options: [{ name: '工作' }, { name: '学习' }, { name: '健康' }, { name: '人际' }, { name: '生活' }] },
      { name: 'Priority', type: 'select', options: [{ name: 'P1' }, { name: 'P2' }, { name: 'P3' }] },
      { name: 'Completed', type: 'checkbox' },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'habit-tracker',
    name: '习惯打卡',
    description: '习惯打卡、完成率和连续天数',
    properties: [
      { name: 'Habit', type: 'title' },
      { name: 'Category', type: 'select', options: [{ name: '健康' }, { name: '学习' }, { name: '成长' }, { name: '生活' }] },
      { name: 'Date', type: 'date' },
      { name: 'Target', type: 'number', format: 'number' },
      { name: 'Actual', type: 'number', format: 'number' },
      { name: 'Completion', type: 'number', format: 'percent' },
      { name: 'Streak', type: 'number', format: 'number' },
      { name: 'Check', type: 'checkbox' },
    ],
  },
  {
    key: 'sleep-log',
    name: '睡眠记录',
    description: '入睡时间、起床时间、睡眠时长和质量',
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Bedtime', type: 'rich_text' },
      { name: 'WakeTime', type: 'rich_text' },
      { name: 'Duration', type: 'number', format: 'number' },
      { name: 'Target Duration', type: 'number', format: 'number' },
      { name: 'Quality', type: 'select', options: [{ name: '优秀' }, { name: '良好' }, { name: '一般' }, { name: '差' }] },
      { name: '7 Day Average', type: 'number', format: 'number' },
      { name: '30 Day Average', type: 'number', format: 'number' },
    ],
  },
  {
    key: 'reading-log',
    name: '阅读记录',
    description: '阅读时长、完成率、书籍和读后感',
    properties: [
      { name: 'Book', type: 'title' },
      { name: 'Date', type: 'date' },
      { name: 'Minutes', type: 'number', format: 'number' },
      { name: 'Target Minutes', type: 'number', format: 'number' },
      { name: 'Streak', type: 'number', format: 'number' },
      { name: 'Completion Rate', type: 'number', format: 'percent' },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'financial-transaction',
    name: '收支记录',
    description: '个人收支、预算和现金流明细',
    properties: [
      { name: 'Title', type: 'title' },
      { name: 'Date', type: 'date' },
      { name: 'Category', type: 'select', options: [{ name: '收入' }, { name: '支出' }, { name: '投资' }, { name: '储蓄' }] },
      { name: 'Amount', type: 'number', format: 'dollar' },
      { name: 'Payment Method', type: 'select', options: [{ name: '现金' }, { name: '微信' }, { name: '支付宝' }, { name: '银行卡' }] },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'budget',
    name: '预算',
    description: '月度预算与支出差异',
    properties: [
      { name: 'Month', type: 'date' },
      { name: 'Category', type: 'title' },
      { name: 'Budget', type: 'number', format: 'dollar' },
      { name: 'Actual', type: 'number', format: 'dollar' },
      { name: 'Variance', type: 'number', format: 'dollar' },
      { name: 'Status', type: 'select', options: [{ name: '正常' }, { name: '超支' }, { name: '节省' }] },
    ],
  },
  {
    key: 'weight-log',
    name: '体重记录',
    description: '体重与 BMI 变化',
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Weight', type: 'number', format: 'number' },
      { name: 'BMI', type: 'number', format: 'number' },
      { name: '7 Day Average', type: 'number', format: 'number' },
      { name: 'Change', type: 'number', format: 'number' },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'body-fat-log',
    name: '体脂记录',
    description: '体脂变化和目标检测',
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Body Fat', type: 'number', format: 'percent' },
      { name: 'Target', type: 'number', format: 'percent' },
      { name: 'Change', type: 'number', format: 'percent' },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'workout-log',
    name: '训练记录',
    description: '训练记录和热量消耗',
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Workout', type: 'title' },
      { name: 'Duration', type: 'number', format: 'number' },
      { name: 'Calories', type: 'number', format: 'number' },
      { name: 'Intensity', type: 'select', options: [{ name: '低' }, { name: '中' }, { name: '高' }] },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'ecommerce-product',
    name: '电商商品库',
    description: '商品、利润和 ROI 追踪',
    properties: [
      { name: 'Product', type: 'title' },
      { name: 'Platform', type: 'select', options: [{ name: '抖音' }, { name: '闲鱼' }, { name: '拼多多' }, { name: '小红书' }] },
      { name: 'Product Link', type: 'url' },
      { name: '1688 Source', type: 'url' },
      { name: 'Purchase Price', type: 'number', format: 'dollar' },
      { name: 'Selling Price', type: 'number', format: 'dollar' },
      { name: 'Logistics Cost', type: 'number', format: 'dollar' },
      { name: 'Promotion Cost', type: 'number', format: 'dollar' },
      { name: 'Sales', type: 'number', format: 'dollar' },
      { name: 'Gross Profit', type: 'number', format: 'dollar' },
      { name: 'Net Profit', type: 'number', format: 'dollar' },
      { name: 'ROI', type: 'number', format: 'percent' },
    ],
  },
  {
    key: 'task-board',
    name: '今日任务节点',
    description: '今日待办节点和完成状态',
    properties: [
      { name: 'Task', type: 'title' },
      { name: 'Date', type: 'date' },
      { name: 'Priority', type: 'select', options: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }] },
      { name: 'Completed', type: 'checkbox' },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'want-to-buy',
    name: '待买清单',
    description: '购买决策、预算和冲动消费分析',
    properties: [
      { name: 'Item', type: 'title' },
      { name: 'Budget', type: 'number', format: 'dollar' },
      { name: 'Actual Price', type: 'number', format: 'dollar' },
      { name: 'Priority', type: 'select', options: [{ name: '高' }, { name: '中' }, { name: '低' }] },
      { name: 'Purchase Degree', type: 'select', options: [{ name: '待购买' }, { name: '已购买' }] },
      { name: 'Category', type: 'select', options: [{ name: '日用' }, { name: '电子' }, { name: '服饰' }, { name: '健康' }, { name: '娱乐' }] },
      { name: 'Date', type: 'date' },
      { name: 'Link', type: 'url' },
      { name: 'Notes', type: 'rich_text' },
      { name: 'Buy Status', type: 'select', options: [{ name: '待购买' }, { name: '已购买' }, { name: '忽略' }] },
    ],
  },
  {
    key: 'english-listening',
    name: '听力',
    description: '英语听力练习记录',
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Material', type: 'rich_text' },
      { name: 'Duration', type: 'number', format: 'number' },
      { name: 'Question Type', type: 'rich_text' },
      { name: 'Total', type: 'number', format: 'number' },
      { name: 'Correct', type: 'number', format: 'number' },
      { name: 'Wrong', type: 'number', format: 'number' },
      { name: 'Accuracy', type: 'number', format: 'percent' },
      { name: 'Transcript', type: 'rich_text' },
      { name: 'Mistakes', type: 'rich_text' },
    ],
  },
  {
    key: 'english-speaking',
    name: '口语',
    description: '口语练习记录',
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Topic', type: 'title' },
      { name: 'Duration', type: 'number', format: 'number' },
      { name: 'Feedback', type: 'rich_text' },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'english-reading',
    name: '阅读',
    description: '英语阅读与长难句复盘',
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Question Type', type: 'rich_text' },
      { name: 'Total', type: 'number', format: 'number' },
      { name: 'Accuracy', type: 'number', format: 'percent' },
      { name: 'Mistakes', type: 'rich_text' },
      { name: 'Hard Sentences', type: 'rich_text' },
      { name: 'Speed Method', type: 'rich_text' },
    ],
  },
  {
    key: 'english-writing',
    name: '写作',
    description: '写作主题、参考和复盘',
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Title', type: 'title' },
      { name: 'Type', type: 'select', options: [{ name: '议论文' }, { name: '说明文' }, { name: '图表' }, { name: '应用文' }] },
      { name: 'Reference', type: 'rich_text' },
      { name: 'Main Points', type: 'rich_text' },
      { name: 'Essay', type: 'rich_text' },
      { name: 'Review', type: 'rich_text' },
    ],
  },
  {
    key: 'life-goal',
    name: '人生目标',
    description: '人生目标分层与目标进度',
    properties: [
      { name: 'Goal Name', type: 'title' },
      { name: 'Category', type: 'select', options: [{ name: '人生' }, { name: '年度' }, { name: '季度' }, { name: '月度' }, { name: '项目' }, { name: '任务' }] },
      { name: 'Progress', type: 'number', format: 'percent' },
      { name: 'Deadline', type: 'date' },
      { name: 'Importance', type: 'select', options: [{ name: '重要' }, { name: '一般' }, { name: '可选' }] },
      { name: 'Status', type: 'select', options: [{ name: '未开始' }, { name: '进行中' }, { name: '完成' }, { name: '暂停' }] },
      { name: 'Next Step', type: 'rich_text' },
    ],
  },
  {
    key: 'ai-tool-library',
    name: 'AI工具库',
    description: 'AI 工具、使用场景和价值评估',
    properties: [
      { name: 'Tool Name', type: 'title' },
      { name: 'Category', type: 'select', options: [{ name: 'ChatGPT' }, { name: 'Gemini' }, { name: 'GitHub Copilot' }, { name: 'Claude' }, { name: 'Notion AI' }, { name: 'Other' }] },
      { name: 'Purpose', type: 'rich_text' },
      { name: 'Cost', type: 'number', format: 'dollar' },
      { name: 'Value', type: 'number', format: 'number' },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'agent-lab',
    name: 'Agent实验室',
    description: 'Agent 原型、测试和问题记录',
    properties: [
      { name: 'Agent', type: 'title' },
      { name: 'Purpose', type: 'rich_text' },
      { name: 'Input', type: 'rich_text' },
      { name: 'Output', type: 'rich_text' },
      { name: 'Trigger', type: 'rich_text' },
      { name: 'Tools', type: 'rich_text' },
      { name: 'Version', type: 'rich_text' },
      { name: 'Status', type: 'select', options: [{ name: '测试中' }, { name: '可用' }, { name: '待升级' }, { name: '停用' }] },
    ],
  },
  {
    key: 'xp-log',
    name: 'XP',
    description: '经验值与成长来源',
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Source', type: 'title' },
      { name: 'XP', type: 'number', format: 'number' },
      { name: 'Category', type: 'select', options: [{ name: '习惯' }, { name: '学习' }, { name: '运动' }, { name: '任务' }, { name: '月目标' }] },
    ],
  },
  {
    key: 'health-file',
    name: '健康档案',
    description: '健康报告与档案记录',
    properties: [
      { name: 'Record', type: 'title' },
      { name: 'Date', type: 'date' },
      { name: 'Type', type: 'select', options: [{ name: '检查' }, { name: '评估' }, { name: '报告' }, { name: '记录' }] },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'important-docs',
    name: '重要文件',
    description: '证件、保险与重要文件目录',
    properties: [
      { name: 'Document', type: 'title' },
      { name: 'Category', type: 'select', options: [{ name: '证件' }, { name: '文件' }, { name: '保险' }, { name: '合同' }, { name: '其他' }] },
      { name: 'File', type: 'files' },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'contacts',
    name: '联系人',
    description: '社交和关系维系',
    properties: [
      { name: 'Name', type: 'title' },
      { name: 'Relation', type: 'select', options: [{ name: '家人' }, { name: '朋友' }, { name: '同事' }, { name: '客户' }, { name: '其他' }] },
      { name: 'Phone', type: 'phone_number' },
      { name: 'Email', type: 'email' },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'family-system',
    name: '家庭系统',
    description: '家庭陪伴和规划记录',
    properties: [
      { name: 'Family Member', type: 'title' },
      { name: 'Type', type: 'select', options: [{ name: '陪伴' }, { name: '计划' }, { name: '关怀' }, { name: '日常' }] },
      { name: 'Date', type: 'date' },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
];

export function buildNotionProperties(fields: FieldSpec[]): Record<string, unknown> {
  const properties: Record<string, unknown> = {};

  for (const field of fields) {
    switch (field.type) {
      case 'title':
        properties[field.name] = { title: {} };
        break;
      case 'rich_text':
        properties[field.name] = { rich_text: {} };
        break;
      case 'number':
        properties[field.name] = {
          number: {
            format: field.format === 'dollar' ? 'dollar' : field.format === 'percent' ? 'percent' : 'number',
          },
        };
        break;
      case 'date':
        properties[field.name] = { date: {} };
        break;
      case 'checkbox':
        properties[field.name] = { checkbox: {} };
        break;
      case 'select':
        properties[field.name] = {
          select: {
            options: (field.options ?? []).map((option) => ({
              name: option.name,
              color: option.color ?? 'default',
            })),
          },
        };
        break;
      case 'multi_select':
        properties[field.name] = {
          multi_select: {
            options: (field.options ?? []).map((option) => ({
              name: option.name,
              color: option.color ?? 'default',
            })),
          },
        };
        break;
      case 'url':
        properties[field.name] = { url: {} };
        break;
      case 'email':
        properties[field.name] = { email: {} };
        break;
      case 'phone_number':
        properties[field.name] = { phone_number: {} };
        break;
      case 'files':
        properties[field.name] = { files: {} };
        break;
      default:
        properties[field.name] = { rich_text: {} };
    }
  }

  return properties;
}
