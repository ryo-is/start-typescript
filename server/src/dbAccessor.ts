import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export class DBAccessor {
  private client: Client;

  constructor() {
    this.client = new Client({
      database: 'development',
      user: 'root',
      host: '127.0.0.1',
      port: 5432,
    });
  }

  public get = async () => {
    try {
      const query = {
        text: 'select * from public."TodoTasks"',
      };
      await this.client.connect();
      const result = await this.client.query(query);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      this.client.end();
    }
  };

  public create = async () => {
    try {
      const query = {
        text:
          'INSERT INTO public."TodoTasks" (uuid, title, "createdAt", "updatedAt") VALUES($1, $2, current_timestamp, current_timestamp)',
        values: [uuidv4(), 'test'],
      };
      await this.client.connect();
      await this.client.query(query);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      this.client.end();
    }
  };
}
