import React from "react";

import {Button} from "@/components/ui/button";
import {NavLink} from "@/components/ui/enhanced/NavLink";
import {IconFont} from "@/components/ui/enhanced/IconFont";
import {Badge} from "@/components/ui/badge";
import {SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem} from "@/components/ui/sidebar";
import {ExternalLink, Orbit} from "lucide-react";
import {SidebarItemProps} from "@/lib/declares/props";
import Link from "next/link";


export const SidebarHeaderContent = () => {

    return <React.Fragment>
        <header className=" w-full h-12 flex items-center ">
            <Link href="/" className="mx-auto p-1.5 color-text">
                <span className="hidden sm:inline-block my-auto select-none "> Pulse Dashboard </span>
            </Link>

        </header>
    </React.Fragment>
}



export const SidebarHeaderSideItem = ({item}: {item: SidebarItemProps}) => {


    return <SidebarMenuItem>
        {
            item.isExternal
                ?
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <a  className="text-muted-foreground hover:text-foreground block rounded-md" target="_blank" rel='noopener noreferrer'  href={item.href}>
                        <IconFont name={item.icon} className="mr-2 h-4 w-4 "/> {item.title}
                        <div className="flex-auto"/>
                        {
                            item.badge ? <Badge variant="secondary" className="float-right"> {item.badge} </Badge>
                                : <ExternalLink />
                        }
                    </a>
                </Button>
                :
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <NavLink href={item.href}>
                        <IconFont name={item.icon} className="mr-2 h-4 w-4 "/> {item.title}
                        <div className="flex-auto"/>
                        {
                            item.badge && <Badge variant="secondary" className="float-right"> {item.badge} </Badge>
                        }
                    </NavLink>
                </Button>
        }

        {item.children?.length ? (
            <SidebarMenuSub className="pr-0 mr-0">
                {item.children?.map((_item:any, _index: number) => (
                    <SidebarMenuSubItem key={_index}>
                        <Button className="w-full justify-start" asChild variant="ghost">
                            <NavLink href={_item.href}>
                                {/*<Clock1 className="mr-2 h-4 w-4 " />*/}
                                <IconFont name={"icon_month2"} className="mr-2 h-4 w-4 "/> {_item.title}
                                <div className="flex-auto"/>
                                {
                                    item.badge && <Badge variant="secondary" className="float-right"> {_item.badge} </Badge>
                                }
                            </NavLink>
                        </Button>
                    </SidebarMenuSubItem>
                ))}
            </SidebarMenuSub>
        ) :null}
    </SidebarMenuItem>

}
