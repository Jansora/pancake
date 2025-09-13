import React from "react";

export interface FCProps {
    className?: string
    children?: React.ReactNode
}

export interface LayoutProps {
    children: React.ReactNode
    params: any
}


export interface ListProps {
    items: ListItemProps[]
}

export interface ListItemProps {

    href?: string
    title: string
    label?: boolean
    icon?: string
    description?: string

}

export interface NavigationProps {
    isExternal: boolean
    icon: string
    description: string
    href: string
    isAdmin: boolean
    title: string
    isDisplay: string
    isStandalone: string
    domains: []
    children: NavigationProps[]
}

export interface SidebarItemProps {
    isExternal: boolean
    icon: string
    description: string
    href: string
    title: string
    badge: string
    isAdmin: boolean

    // @ts-ignore
    children: SidebarItemProps[]
}

export interface SearchItemProps {
    title: string,
    items: NavigationProps[]
    description: string
    href: string
    isAdmin: boolean
}


export interface Navigation {
    title: string,
    items: NavigationProps[]
    description: string
    href: string
    isAdmin: boolean


}