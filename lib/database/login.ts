import { NotFoundError, PasswordError } from "../declares/account"
import { fetch_account_by_name } from "./account"

export const login_with_default_auth = async (username: string, password: string) => {

  if (process.env.ADMIN_USERNAME !== username) {
    console.info("process.env.ADMIN_USERNAME is not equal to username", new NotFoundError().message)
    throw new NotFoundError()
  }
  if (process.env.ADMIN_PASSWORD !== password) {
    console.info("process.env.ADMIN_PASSWORD is not equal to password", new PasswordError().message)
    throw new PasswordError()
  }
  const account = await fetch_account_by_name(username)
  if (!account) {
    console.info("account is not found in database", new NotFoundError().message)
    throw new NotFoundError()
  }

  return account


}