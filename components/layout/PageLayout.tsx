"use client"

import React, {useContext} from "react";


import {FCProps} from "@/lib/declares/props";
import {Sidebar, SidebarContent, SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {GlobalStore} from "@/lib/store/global";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import {SidebarFooterContent} from "@/components/layout/sidebar/SidebarFooterContent";
import {SidebarHeaderContent} from "@/components/layout/sidebar/SidebarHeaderContent";
import {
    SidebarInsetContent,
    SidebarInsetContentFooter,
    SidebarInsetContentHeader
} from "@/components/layout/sidebar/SidebarInsetContext";
import {DefaultSidebar} from "@/components/layout/background/DefaultSidebar";
import { StarsBackground } from "../animate-ui/backgrounds/stars";


// const none_open = ["/share", "/user/login"];
const PageLayout = ({children}: FCProps) => {


    const { sidebar} = useContext(GlobalStore);


    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    // console.log("PageLayout sidebar", sidebar)


    return (

        <SidebarProvider
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
        >

            <Sidebar>
                <StarsBackground className="inset-0  rounded-xl" >

                {/*<SidebarHeaderContent />*/}

                {/*<Separator orientation="horizontal" className="absolute w-full my-1 -mb-1 mt-12"/>*/}

                <SidebarContent className="w-full overflow-auto">
                    {sidebar || <DefaultSidebar/>}
                </SidebarContent>

                <SidebarFooterContent />
                </StarsBackground>

            </Sidebar>
            <SidebarInset>
                <SidebarInsetContentHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Separator orientation="horizontal" className="fixed my-1 -mb-1 mt-12"/>
                <ScrollArea className="h-sidebar-content w-full vsc-initialized">
                    <SidebarInsetContent>
                        {children}
                    </SidebarInsetContent>
                </ScrollArea>
                <SidebarInsetContentFooter />
            </SidebarInset>


        </SidebarProvider>
    )
}

export default PageLayout;

