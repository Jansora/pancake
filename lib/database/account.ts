import { DB_CLIENT } from "./client";
import { getOneRecord } from "./client";
import { AccountProps, AccountSimpleProps } from "../declares/account";




export const fetch_account_by_id = async (id: number) => {
    const rows = await DB_CLIENT.query<AccountProps>(
        `SELECT a.*
            FROM accounts a
            where a.id = $1
              order by a.id`,
        [id],
    );

    return getOneRecord(rows)
}

export const fetch_simple_account_by_name = async (name: string) => {
  const rows = await DB_CLIENT.query<AccountSimpleProps>(
        `SELECT a.id, a.name, a.avatar, a.description, a.homepage, a.created_at
            FROM accounts a
            where a.name = $1
              order by a.id`,
        [name],
    );

    return getOneRecord(rows)
}


export const update_account_info = async (id: number, info: AccountProps) => {
    await DB_CLIENT.query(
        `UPDATE accounts SET avatar = $2, homepage = $3, updated_at = now() WHERE id = $4`,
        [info.id, info.avatar, info.homepage],
    );
}

export const insert_account = async (account: AccountProps) => {
    await DB_CLIENT.query(
        `INSERT INTO accounts (id, name, avatar, description, email, homepage, role, source, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now(), now())`,
        [account.id, account.name, account.avatar, account.description, account.email, account.homepage, account.role, account.source]
    );
}