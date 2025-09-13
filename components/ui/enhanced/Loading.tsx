"use client"

import React from "react";
import {Loader} from "lucide-react";
import {cn} from "@/lib/utils";

interface Props {
    loading: boolean
    className?: string
    children?: React.ReactNode
}
export function Loading({loading, className, children}: Props) {
    return (
        loading
            ? <Loader className={cn("w-4 h-4 mr-2  animate-spin-slow", className) } />
            : children
    )
}
