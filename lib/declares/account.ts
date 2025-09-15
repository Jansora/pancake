import {CredentialsSignin} from "next-auth";


export interface AccountProps {
    id: number
    name?: string
    avatar?: string
    description?: string
    email?: string
    homepage?: string
    role?: string
    source?: string
    created_at?: Date
    updated_at?: Date
}

export interface AccountSimpleProps {
  id?: string
  name?: string
  avatar?: string
  homepage?: string
  description?: string
  created_at?: string
}

export const DEFAULT_ADMIN_ACCOUNT_ID = 1
export const DEFAULT_ADMIN_ACCOUNT_NAME = "admin"
export const DEFAULT_ADMIN_ACCOUNT_PASSWORD = "admin"

export enum AccountRole {
  ADMIN = "admin",
  OAUTH = "oauth",
  GUEST = "guest"
}

export enum AccountSource {
  LOCAL = "local",
  GITHUB = "github"
}


export class NotFoundError extends CredentialsSignin {
    code = "NOT_FOUND"
    message = "用户名未找到"
}
export class PasswordError extends CredentialsSignin {
    code = "PASSWORD_ERROR"
    message = "密码不正确"
}