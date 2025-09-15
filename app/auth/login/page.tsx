// "use client"

import Link from "next/link"

import React from "react"
import {UserAuthForm} from "../../../components/pages/user/UserAuthForm";


export const metadata = {
    title: "登录",
    description: "Authentication forms built using the components.",
}


export default function Page() {

    return (
        <div className="mx-auto h-sidebar-content">
            <div className="grid min-h-svh grid-cols-1">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex flex-1 items-center justify-center mx-auto">
                        <div className="w-full max-w-xs">
                            <div className="w-full sm:w-[350px] mx-auto flex flex-col justify-center space-y-6">
                                <div className="flex flex-col space-y-2 text-center">
                                    <h1 className="text-2xl font-semibold tracking-tight">
                                        登录
                                    </h1>
                                </div>
                                <UserAuthForm/>
                                <p className="px-4 text-center text-sm text-muted-foreground">
                                    登录即表示您同意我们的{" "}
                                    <Link
                                        href="/specification/terms"
                                        className="underline underline-offset-4 hover:text-primary"
                                    >
                                        服务条款
                                    </Link>{" "}
                                    和{" "}
                                    <Link
                                        href="/specification/privacy"
                                        className="underline underline-offset-4 hover:text-primary"
                                    >
                                        隐私政策
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}