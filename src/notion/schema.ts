export interface FieldSpec {
  name: string;
  type: 'title' | 'rich_text' | 'number' | 'date' | 'checkbox' | 'select' | 'multi_select' | 'relation' | 'url' | 'email' | 'phone_number' | 'people' | 'files';
  format?: 'number' | 'dollar' | 'percent' | 'date' | 'time';
  options?: Array<{ name: string; color?: string }>;
  relationDatabase?: string;
  relationFieldName?: string;
}

export interface DatabaseSpec {
  key: string;
  name: string;
  icon?: string;
  description?: string;
  properties: FieldSpec[];
  parentType?: 'page_id';
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
    description: '个人生活记录 + 成长 + 财富 + AI Agent 统一总入口',
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
      'AI今日总结',
      'AI明日建议',
    ],
  },
];

export const databaseSpecs: DatabaseSpec[] = [
  {
    key: 'daily-life-index',
    name: '今日生活指数',
    description: '每天总结生活状态、趋势和 AI 摘要',
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
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Time', type: 'rich_text' },
      { name: 'Task', type: 'title' },
      { name: 'Tag', type: 'multi_select', options: [{ name: '工作' }, { name: '学习' }, { name: '健康' }, { name: '生活' }, { name: '关系' }] },
      { name: 'Priority', type: 'select', options: [{ name: 'P1' }, { name: 'P2' }, { name: 'P3' }] },
      { name: 'Status', type: 'checkbox' },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'habit-tracker',
    name: '习惯打卡',
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
    properties: [
      { name: 'Date', type: 'date' },
      { name: 'Category', type: 'select', options: [{ name: '收入' }, { name: '支出' }, { name: '投资' }, { name: '储蓄' }] },
      { name: 'Title', type: 'title' },
      { name: 'Amount', type: 'number', format: 'dollar' },
      { name: 'Notes', type: 'rich_text' },
      { name: 'Payment Method', type: 'select', options: [{ name: '现金' }, { name: '微信' }, { name: '银行卡' }, { name: '支付宝' }] },
    ],
  },
  {
    key: 'budget',
    name: '预算',
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
    properties: [
      { name: 'Product', type: 'title' },
      { name: 'Platform', type: 'select', options: [{ name: '抖音' }, { name: '闲鱼' }, { name: '拼多多' }, { name: '小红书' }] },
      { name: 'Product Link', type: 'url' },
      { name: '1688 Source', type: 'url' },
      { name: 'Purchase Price', type: 'number', format: 'dollar' },
      { name: 'Selling Price', type: 'number', format: 'dollar' },
      { name: 'Logistics Cost', type: 'number', format: 'dollar' },
      { name: 'After Sales Rate', type: 'number', format: 'percent' },
      { name: 'Promotion Cost', type: 'number', format: 'dollar' },
      { name: 'Sales', type: 'number', format: 'dollar' },
      { name: 'Gross Profit', type: 'number', format: 'dollar' },
      { name: 'Net Profit', type: 'number', format: 'dollar' },
      { name: 'ROI', type: 'number', format: 'percent' },
    ],
  },
  {
    key: 'ecommerce-order',
    name: '电商订单',
    properties: [
      { name: 'Order No', type: 'title' },
      { name: 'Platform', type: 'select', options: [{ name: '抖音' }, { name: '闲鱼' }, { name: '拼多多' }, { name: '小红书' }] },
      { name: 'Date', type: 'date' },
      { name: 'Order Value', type: 'number', format: 'dollar' },
      { name: 'Net Profit', type: 'number', format: 'dollar' },
      { name: 'Status', type: 'select', options: [{ name: '待发货' }, { name: '已发货' }, { name: '已完成' }, { name: '待退款' }] },
      { name: 'Notes', type: 'rich_text' },
    ],
  },
  {
    key: 'task-board',
    name: '今日任务节点',
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
    properties: [
      { name: 'Family Member', type: 'title' },
      { name: 'Type', type: 'select', options: [{ name: '陪伴' }, { name: '计划' }, { name: '关怀' }, { name: '日常' }] },
      { name: 'Notes', type: 'rich_text' },
      { name: 'Date', type: 'date' },
    ],
  },
];
