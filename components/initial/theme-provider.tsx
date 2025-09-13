"use client"

import * as React from "react"
import {ThemeProvider as NextThemesProvider, type ThemeProviderProps} from "next-themes"

import {useTheme} from "next-themes";
import {useEffect} from "react";


const MountTheme = () => {
    const { setTheme } = useTheme()


    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e => {
            if (e.matches) {
                setTheme("dark")
            }
            else {
                setTheme("light")
            }
        });
    })

    return <></>
}
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>
        <MountTheme />
        {children}
    </NextThemesProvider>
}
