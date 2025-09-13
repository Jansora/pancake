"use client"

import Link from "next/link";
import {cn} from "@/lib/utils";

import {usePathname} from "next/navigation";

import {FCProps} from "@/lib/declares/props";


interface Props extends FCProps {
    active?: boolean,
    href: string
    prefix_match?: boolean
}

export const NavLink = ({active, className, children, href, prefix_match}: Props) => {

    const pathname = usePathname()
    const _active = active == undefined ?
        (prefix_match
            ? decodeURIComponent(pathname || "").startsWith(decodeURIComponent(href || ""))
            : decodeURIComponent(pathname || "") === (decodeURIComponent(href || "")) )

        : active;

    // console.log("NavLink", pathname, href, _active)
    return <Link href={href}
                 className={cn(
                         "hover:text-foreground block rounded-md",
                         _active ? "text-foreground bg-accent" : "text-muted-foreground",
                         className
                 )}
    >
        {children}
    </Link>
}