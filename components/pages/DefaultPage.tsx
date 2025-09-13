"use client"

import Image from "next/image";
import {SidebarInsetContentSub} from "@/components/layout/sidebar/SidebarInsetContext";
import {redirect, usePathname} from "next/navigation";
import React from "react";
import { HoleBackground } from "../animate-ui/backgrounds/hole";

export default function DefaultPage() {

    return (
        <SidebarInsetContentSub className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

            <DefaultPageShow />

        </SidebarInsetContentSub>
    );
}


export function DefaultRedirectSubPage({subPath}: {subPath: string}) {

    const pathname = usePathname()

    redirect(`${pathname}/${subPath}`)
}

export function DefaultPageShow() {

    const pathname = usePathname()

    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <HoleBackground className="absolute inset-0 flex items-center justify-center rounded-xl" />

            <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
            <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
                <li className="mb-2 tracking-[-.01em]">
                    This is a default page.

                </li>
                <li className="mb-2 tracking-[-.01em]">
                    This page's pathname is {" "}
                    <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
                        {pathname}
                    </code>
                    .
                </li>
            </ol>
        </main>
    );
}
