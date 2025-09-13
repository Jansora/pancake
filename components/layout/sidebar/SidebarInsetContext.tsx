"use client"

import {FCProps} from "@/lib/declares/props";
import {useSidebar} from "@/components/ui/sidebar";
import React, {useContext} from "react";
import {Separator} from "@/components/ui/separator";
import {GlobalStore} from "@/lib/store/global";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {NavLink} from "@/components/ui/enhanced/NavLink";
import {PanelLeftClose, PanelLeftOpen} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {getClientUser, isClientLogged} from "@/lib/auth/client";
import Link from "next/link";
import ThemeToggle from "@/components/layout/header/ThemeToggle";


export const SidebarInsetContent = ({children, className}: FCProps) => {
    const {open} = useSidebar()

    const _className = (open ? "w-sidebar-content " : 'w-full') + " h-sidebar-content transition-[width] ease-linear duration-200 "

    return <div className={cn("flex px-3 ", _className, className)}>
        {children}
    </div>
}
export const SidebarInsetContentSubCenter = ({children, className}: FCProps) => {

    return <div className={cn("w-full flex items-center justify-center h-sidebar-content", className)}>
        {children}
    </div>
}

export const SidebarInsetContentSub = ({children, className}: FCProps) => {

    return <div className={cn("sm:mx-auto h-sidebar-content w-full px-3 py-5", className)}>
        {children}
    </div>
}


interface Props extends FCProps {
    sidebarOpen: boolean,
    setSidebarOpen: Function
}

export const SidebarInsetContentHeader = ({sidebarOpen, setSidebarOpen}: Props) => {
    const { breadcrumbs } = useContext(GlobalStore);
    const { toggleSidebar } = useSidebar()
    const logged = isClientLogged()
    return <React.Fragment>
        <header className="sticky zx-100 top-0 flex h-12 shrink-0  bg-sidebar items-center gap-2 pr-5">
            <div className="flex items-center gap-2 px-4">
                {

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-7 w-7 cursor-pointer")}
                        onClick={(event) => {
                            toggleSidebar()
                        }}
                    >
                        {
                            sidebarOpen ?  <PanelLeftClose /> : <PanelLeftOpen />
                        }

                        <span className="sr-only">Toggle Sidebar</span>
                    </Button>
                }

                {
                   <Separator orientation="vertical" className="mr-2 h-4"/>
                }
                <Breadcrumb>
                    <BreadcrumbList>
                        
                        {
                            breadcrumbs.map((breadcrumb, index) => {
                                return <React.Fragment key={index}>
                                    {
                                        index == 0 ||
                                        <BreadcrumbSeparator className="hidden md:block"/>
                                    }
                                    <BreadcrumbItem className="hidden md:block" key={index}>
                                        {breadcrumb.children ||
                                            <BreadcrumbLink href={breadcrumb.href} asChild>
                                                <NavLink href={breadcrumb.href || "#"}>
                                                    {breadcrumb.title}
                                                </NavLink>
                                            </BreadcrumbLink>}

                                    </BreadcrumbItem>
                                </React.Fragment>
                            })
                        }

                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="ml-auto flex items-center">

                <div className="mr-6">
                    <ThemeToggle />
                </div>

                <Separator orientation="vertical" className="mr-2 h-4"/>


                <p className="text-sm leading-6">
                    {
                        logged ? <span>
                            <span className="text-gray-400 mr-2"> Logged with  </span>
                                <span className="font-bold"> {getClientUser().name} </span>
                        </span>:
                            <Link href="/auth/signin" > 登录 </Link>
                    }
                </p>
            </div>
        </header>
    </React.Fragment>
}


export const SidebarInsetContentFooter = ({children}: FCProps) => {


    return <React.Fragment>
        <footer
            className="sticky zx-100 bottom-0 flex h-16 bg-sidebar shrink-0 items-center gap-2 px-3">
            <div className="w-full text-xs leading-5 text-gray-400  px-16 lg:px-0">

                <span className="px-4">
                        Copyright © 2013 - 2025 . All Rights Reserved.

                    </span>
                <span className="px-4 float-right">
                        Built with NEXT.js
                </span>
            </div>
        </footer>
    </React.Fragment>
}

