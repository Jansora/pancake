import React, {Dispatch} from "react";
import {UserProps} from "@/lib/declares/user";

export declare class StoreData {
    dispatch: Dispatch<{ payload: any }>
}

export declare class BreadCrumb {
    // index?: string
    title?: string | React.ReactNode
    href?: string
    level: number
    children?: React.ReactNode
}


export declare class GlobalStoreData extends StoreData {
    breadcrumbs: BreadCrumb[]
    sidebar: React.ReactNode

    user: UserProps

    id: string
}


