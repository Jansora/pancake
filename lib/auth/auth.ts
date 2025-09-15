// import ldap from "ldapjs"
import NextAuth, { CredentialsSignin } from "next-auth"
import "next-auth/jwt"

import CredentialsProvider from "next-auth/providers/credentials"
import * as bcrypt from "bcrypt";
import { fetch_simple_account_by_name } from "../database/account";
import { AccountSimpleProps, NotFoundError, PasswordError } from "../declares/account";

// import {fetchUser} from "@/lib/fetch/client/fetch-user";

// @ts-ignore
export const { handlers, auth, signIn, signOut } = NextAuth({
  basePath: "/api/v1/auth/next_auth",
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "LOCAL_AUTH",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.info("xxx", credentials)
        const username = credentials.username as string
        const password = credentials.password as string
        if (process.env.ADMIN_NAME !== username) {
          console.info("process.env.ADMIN_NAME is not equal to username", new NotFoundError().message)
          throw new NotFoundError()
        }
        if (process.env.ADMIN_PASSWORD !== password) {
          console.info("process.env.ADMIN_PASSWORD is not equal to password", new PasswordError().message)
          throw new PasswordError()
        }
        const account = await fetch_simple_account_by_name(username)
        if (!account) {
          console.info("account is not found in database", new NotFoundError().message)
          throw new NotFoundError()
        }
        return {
          id: account.id,
          name: account.name,
          image: account.avatar,
          homepage: account.homepage,
          description: account.description,
          created_at: account.created_at,
        }
      },

      // @ts-ignore
      jwt({ token, trigger, session, account }) {
        if (trigger === "update") token.name = session.user.name
        return token
      }
    }),
  ],
  callbacks: {
    async signIn(user) {
      // 如果登录失败，返回 false 并设置错误信息
      const isSignIn = user ? true : false

      if (!isSignIn) {
        return false;
      }
      return true; // 登录成功
    },
    //@ts-ignore
    async jwt({ token, user }: { token: any, user: AccountSimpleProps }) {
      const isSignIn = user ? true : false
      if (isSignIn) {
        token.id = user.id
        token.name = user.name
        token.avatar = user.avatar
        token.homepage = user.homepage
        token.description = user.description
        token.created_at = user.created_at
      }
      return token
    },
    // @ts-ignore
    async session({ session, token }) {
      return { ...session, user: { ...token } }
    },
  },
  pages: {
    signIn: '/auth/login'
  },
  experimental: { enableWebAuthn: true },

})




export async function hashPassword(password: string) {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function comparePasswordHash(
  plainPassword: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, passwordHash);
}