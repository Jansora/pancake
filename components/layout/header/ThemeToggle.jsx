"use client"

import * as React from "react"
import {GlobeIcon, MoonIcon, SunIcon} from "@radix-ui/react-icons"
import {useTheme} from "next-themes"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {IconFont} from "@/components/ui/enhanced/IconFont";


export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    // console.log("xxx theme", theme)

    //
    // return  <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
    //     <SidebarMenuButton onClick={() => setTheme("light")} >
    //         <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all" /> 亮色
    //     </SidebarMenuButton>
    //     <SidebarMenuButton onClick={() => setTheme("dark")} >
    //         <MoonIcon className="h-5 w-5 rotate-0 scale-100 transition-all " /> 暗黑
    //     </SidebarMenuButton>
    //     <SidebarMenuButton onClick={() => setTheme("system")} >
    //         <GlobeIcon className="h-5 w-5 rotate-0 scale-100 transition-all" /> 系统
    //     </SidebarMenuButton>
    // </RadioGroup>

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
                <IconFont name="theme" className="mr-2 h-4 w-4 " />
                {/*<GlobeIcon className="mr-2 h-4 w-4 " />*/}
                主题设置
            </Button>
        {/*</RadioGroup>*/}
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={0} className="">
            <DropdownMenuItem onClick={() => setTheme("light")}>
                <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all" /> 亮色
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
                <MoonIcon className="h-5 w-5 rotate-0 scale-100 transition-all " /> 暗黑
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
                <GlobeIcon className="h-5 w-5 rotate-0 scale-100 transition-all" /> 跟随系统
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    //
    // if (theme === "light") {
    //     return <SunIcon onClick={() => setTheme("dark")} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
    // }
    // if (theme === "dark") {
    //     return <MoonIcon onClick={() => setTheme("light")} className=" h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all " />
    // }
    // return <MoonIcon onClick={() => setTheme("light")} className=" h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all " />
    //
    // return (
    //     <span>
    //         {
    //             theme === "light" &&
    //             <SunIcon onClick={() => setTheme("dark")} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    //         }
    //         {/*{*/}
    //         {/*    theme === "dark" &&*/}
    //         {/*    <MoonIcon onClick={() => setTheme("light")} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />*/}
    //         {/*}*/}
    //         <MoonIcon onClick={() => setTheme("light")} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    //
    //         {/*{*/}
    //         {/*    theme === "system" &&*/}
    //         {/*    <MoonIcon onClick={() => setTheme("light")} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />*/}
    //         {/*}*/}
    //         {/*<MoonIcon onClick={() => setTheme("light")} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />*/}
    //     </span>
    // )
}
