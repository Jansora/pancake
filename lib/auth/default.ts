// import ldap from "ldapjs"
import NextAuth from "next-auth"
import "next-auth/jwt"

import CredentialsProvider from "next-auth/providers/credentials"
import * as bcrypt from "bcrypt";
import {AccountSimpleProps, InvalidLoginTypeError, LoginType} from "../declares/account";
import {login_with_default_auth} from "@/lib/database/login";
import {formatNativeTime} from "@/lib/utils";

// import {fetchUser} from "@/lib/fetch/client/fetch-user";

// @ts-ignore
export const { handlers, auth, signIn, signOut } = NextAuth({
  basePath: "/api/v1/auth/default",
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "LOCAL_AUTH",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        type: { label: "type", type: "text" },
      },
      // @ts-ignore
      async authorize(credentials, request) {
        console.info("xxx", credentials, request.headers)
        const username = credentials.username as string
        const password = credentials.password as string
        const type = credentials.type as string
        let account = null;
        if (type === LoginType.DEFAULT) {
           account = await login_with_default_auth(username, password)
        }
        else if (type === LoginType.GUEST) {
           account = await login_with_default_auth(username, password)
        }
        else if (type === LoginType.GITHUB) {
           account = await login_with_default_auth(username, password)
        }
        else {
          throw new InvalidLoginTypeError()
        }


        const simple : AccountSimpleProps = {
          id: account.id,
          name: account.name,
          role: account.role,
          avatar: account.avatar,
          homepage: account.homepage,
          description: account.description,
          created_at: formatNativeTime(account.created_at),
        }
        return simple
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