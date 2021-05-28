import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

const pool = new Pool({
  database: 'development',
  user: 'root',
  host: '127.0.0.1',
  port: 5432,
});

export class DBAccessor {
  public get = async () => {
    const client = await pool.connect();
    try {
      const query = {
        text: 'select * from public."TodoTasks"',
      };
      const result = await client.query(query);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      client.release();
    }
  };

  public create = async (title: string) => {
    const client = await pool.connect();
    try {
      const query = {
        text: 'insert into public."TodoTasks" (uuid, title, "createdAt", "updatedAt") VALUES($1, $2, current_timestamp, current_timestamp)',
        values: [uuidv4(), title],
      };
      await client.query(query);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      client.release();
    }
  };

  public update = async ({
    uuid,
    title,
    status,
  }: {
    uuid: string;
    title: string;
    status: string;
  }) => {
    console.log(uuid, title, status);
    const client = await pool.connect();
    try {
      const query = {
        text: 'update public."TodoTasks" set title = $2, status=$3 where uuid = $1',
        values: [uuid, title, status],
      };
      await client.query(query);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      client.release();
    }
  };

  public delete = async ({ uuid }: { uuid: string }) => {
    const client = await pool.connect();
    try {
      const query = {
        text: 'delete from public."TodoTasks" where uuid = $1',
        values: [uuid],
      };
      await client.query(query);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      client.release();
    }
  };
}
