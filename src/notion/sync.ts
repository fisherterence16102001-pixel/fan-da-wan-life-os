import { Client } from '@notionhq/client';
import { AppConfig } from '../config';

export function createNotionClient(config: AppConfig): Client {
  return new Client({ auth: config.notionToken });
}

export async function getDatabaseList(client: Client): Promise<any[]> {
  const response = await client.search({
    filter: {
      property: 'object',
      value: 'database',
    },
  });
  return (response.results ?? []) as any[];
}
