import { Pool } from 'pg';
import { DbDriver, PageResult, PageOpts } from '../declares/database';


export class PgDriver implements DbDriver {
    private pool: Pool;

    constructor(connStr: string) {
        this.pool = new Pool({
            connectionString: connStr,
            max: 100,
            min: 10,
        });
    }

    async query<T>(sql: string, params?: any[]): Promise<T[]> {
        const { rows } = await this.pool.query(sql, params);
        return rows;
    }

    async page<T>(
        sql: string,
        params: any[] = [],
        { page, size }: PageOpts
    ): Promise<PageResult<T>> {
        const offset = (page - 1) * size;
        const countSql = `SELECT COUNT(*) AS cnt FROM (${sql}) AS _t`;
        const [{ cnt: total }] = await this.query<{ cnt: string }>(countSql, params);
        const rows = await this.query<T>(
            `${sql} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
            [...params, size, offset]
        );
        return { rows, total: Number(total) };
    }

    async close() {
        await this.pool.end();
    }
}

if (!process.env.DATABASE_URI) {
    throw new Error('Failed to connect. check env DATABASE_URI and network');

}

export function getOneRecord<T>(rows: T[]): T | null {
    if (rows.length === 0) {
        return null
    }
    return rows[0]
}

export const DB_CLIENT = new PgDriver(process.env.DATABASE_URI);
