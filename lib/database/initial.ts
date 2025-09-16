import {AccountRole, AccountSource, DEFAULT_ADMIN_ACCOUNT_ID} from "../declares/account"
import {fetch_account_by_name, insert_account} from "./account"
import {DB_CLIENT} from "./client"

export const initialize_account = async () => {

  if (!process.env.ADMIN_USERNAME) {
    throw new Error("environment variable ADMIN_USERNAME is not set")
  }

  if (!process.env.ADMIN_PASSWORD) {
    throw new Error("environment variable ADMIN_PASSWORD is not set")
  }

  const existing_account = await fetch_account_by_name(process.env.ADMIN_USERNAME!)
  if (existing_account) {
    return
  }

  console.info("initialize admin account. admin_account_id: ", process.env.ADMIN_ACCOUNT_ID ?? DEFAULT_ADMIN_ACCOUNT_ID.toString(), "admin_username: ", process.env.ADMIN_USERNAME)
  const account = {
    id: parseInt(process.env.ADMIN_ACCOUNT_ID ?? DEFAULT_ADMIN_ACCOUNT_ID.toString()),
    role: AccountRole.ADMIN,
    source: AccountSource.LOCAL,
    name: process.env.ADMIN_USERNAME,
    avatar: "",
    description: "this is the admin account",
    email: "",
    homepage: "",
    created_at: new Date(),
    updated_at: new Date()
  }
  await insert_account(account)
}
  

export const initial_tables = async () => {
  await DB_CLIENT.query(
    `
      -- account 表, 管理 account 信息
      CREATE TABLE IF NOT EXISTS accounts
      (
          id            bigserial PRIMARY KEY,                 -- 自增主键
          name         varchar(255),
          avatar        varchar(255),
          description   varchar(255),
          email         varchar(255),
          homepage      varchar(255),
          role          varchar(255),
          source        varchar(32),
          created_at    timestamp(6),
          updated_at    timestamp(6)
      );

      COMMENT ON COLUMN accounts.name        IS '用户名';

      -- account token 表, 管理 account 登录
      CREATE TABLE IF NOT EXISTS account_tokens
      (
          id            bigserial PRIMARY KEY,                 -- 自增主键
          account_id    integer NOT NULL ,
          token        varchar(32),
          created_at    timestamp(6),
          expired_at    timestamp(6),

          CONSTRAINT token   UNIQUE (token)
      );

    `
  )
}