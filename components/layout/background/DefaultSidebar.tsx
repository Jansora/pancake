"use client"

import * as React from "react";
import {cn} from "@/lib/utils";


export const DefaultSidebar = ({className}: {className?: string}) => {


    return <>

        <div className={cn("px-2 flex items-center h-sidebar-content w-sidebar-content", className)}>
            {/*<PulseAnimation width="250px" height="300px"  className=""  />*/}

        </div>
    </>
}