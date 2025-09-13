// import ldap from "ldapjs"
import NextAuth from "next-auth"
import "next-auth/jwt"

import CredentialsProvider from "next-auth/providers/credentials"
// import {fetchUser} from "@/lib/fetch/client/fetch-user";
import {ResultDto} from "@/lib/fetch";
import {UserProps} from "@/lib/declares/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
    basePath: "/api/auth",
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "LDAP",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {

                // @ts-ignore
                const username = credentials.username
                // @ts-ignore
                const password = credentials.password

                console.log(`${username}  is trying login. verified by custom.`)
                // You might want to pull this call out so we're not making a new LDAP client on every login attemp
                // const client = ldap.createClient({
                //     // url: process.env.LDAP_URI,
                //     url: "ldap://www.jansora.com"
                // })

                // Essentially promisify the LDAPJS client.bind function
                return new Promise((resolve, reject) => {
                    // // @ts-ignore
                    // client.bind(username, password, (error) => {
                    //     if (error) {
                    //         console.error(`${username} login end with failed. ${error}`)
                    //         reject()
                    //     } else {
                    //         console.log(`${username}  LDAP authentication successful！try to fetch userinfo!`)
                    //
                    //         // NT
                    //         // @ts-ignore
                    //         const username = credentials.username.split("@")[0]
                    //         fetchUser(username)
                    //             .then((data: ResultDto<UserProps> ) => {
                    //             if (data.status) {
                    //                 const user = data.data
                    //                 console.log(`${username} fetch userinfo successfully！${JSON.stringify(user)}`)
                    //
                    //                 console.log(`${username} login end with succeed.`)
                    //                 resolve(user)
                    //             }
                    //             else {
                    //                 console.error(`${username} login end with failed. [fetch account failed]`)
                    //                 reject()
                    //             }
                    //         })
                    //             .catch(e => {
                    //                 reject()
                    //             })
                    //             .finally()
                    //
                    //     }
                    // })
                })
            },
            // @ts-ignore
            jwt({ token, trigger, session, account }) {
                if (trigger === "update") token.name = session.user.name
                if (account?.provider === "keycloak") {
                    return { ...token, accessToken: account.access_token }
                }
                return token
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            const isSignIn = user ? true : false
            if (isSignIn) {
                // console.log("jwt:", user)
                // @ts-ignore
                token.username = user.username
                // @ts-ignore
                token.email = user.email
            }
            return token
        },
        // @ts-ignore
        async session({ session, token }) {
            return { ...session, user: { username: token.username , ...token} }
        },
    },
    pages: {
        // signIn: '/auth/signin'
    },
    experimental: { enableWebAuthn: true },

})



