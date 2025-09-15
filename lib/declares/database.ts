export interface PageOpts {
    page: number;      // 从 1 开始
    size: number;
}

export interface PageResult<T> {
    rows: T[];
    total: number;
}

export interface DbDriver {
    query<T = any>(sql: string, params?: any[]): Promise<T[]>;
    page<T = any>(
        sql: string,
        params?: any[],
        opts?: PageOpts
    ): Promise<PageResult<T>>;
    close(): Promise<void>;
}