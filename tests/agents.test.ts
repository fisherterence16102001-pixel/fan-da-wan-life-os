import { describe, expect, it } from '@jest/globals';
import { loadEnv } from '../src/config';
import { databaseSpecs } from '../src/notion/schema';

describe('Environment config', () => {
  it('requires required Notion env vars', () => {
    const originalToken = process.env.NOTION_TOKEN;
    const originalParentPageId = process.env.PARENT_PAGE_ID;

    delete process.env.NOTION_TOKEN;
    delete process.env.PARENT_PAGE_ID;

    expect(() => loadEnv()).toThrow('Missing required env vars');

    if (originalToken) {
      process.env.NOTION_TOKEN = originalToken;
    }
    if (originalParentPageId) {
      process.env.PARENT_PAGE_ID = originalParentPageId;
    }
  });

  it('includes the expected life os databases', () => {
    const names = databaseSpecs.map((db) => db.name);
    expect(names).toContain('今日生活指数');
    expect(names).toContain('习惯打卡');
    expect(names).toContain('电商商品库');
    expect(names).toContain('人生目标');
  });
});
