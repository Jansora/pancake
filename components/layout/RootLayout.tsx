"use client"

import {Toaster} from "@/components/ui/sonner";
import React from "react";

import {FCProps} from "@/lib/declares/props";
import LoadIconFont from "@/components/initial/LoadIconFont";
import {ThemeProvider} from "../initial/theme-provider";
import "@/lib/css/globals.css";


const RootLayout = ({children}: FCProps) => {


    // @ts-ignore
    return (
        <html lang="zh" suppressHydrationWarning={true}>
        <head>
            <LoadIconFont />
            <title></title>
        </head>

        <body
            // @ts-ignore
            className={`h-screen vsc-initialized  antialiased`} inmaintabuse="1" cz-shortcut-listen="true">
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
                        {children}
                </ThemeProvider>
                <Toaster richColors theme={"system"} />
            </body>

        </html>

    )
}

export default RootLayout;


