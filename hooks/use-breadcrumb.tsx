"use client"

import {useContext, useEffect, useState} from "react"
import {GlobalStore} from "@/lib/store/global";
import {BreadCrumb} from "@/lib/declares/layout";

export function useBreadcrumbs() {
    const {breadcrumbs, dispatch} = useContext(GlobalStore)
    const [tobeAddedBreadcrumb, addBreadcrumb] = useState(null)
    const [tobeRemovedBreadcrumb, removeBreadcrumb] = useState(null)


    useEffect(() => {
        if (tobeAddedBreadcrumb) {
            // @ts-ignore
            const existed = breadcrumbs.filter((_breadcrumb) => _breadcrumb.level === tobeAddedBreadcrumb.level).length > 0

            // Check if breadcrumb already exists
            if (!existed) {
                const merged = [...breadcrumbs, tobeAddedBreadcrumb]
                // @ts-ignore
                merged.sort((a, b) => a.level - b.level);
                dispatch({payload: {breadcrumbs: merged}})
            }
        }
        if (tobeRemovedBreadcrumb) {

            // @ts-ignore
            const existed = breadcrumbs.filter((_breadcrumb) => _breadcrumb.level === tobeRemovedBreadcrumb.level).length > 0
            // Check if breadcrumb already exists
            if (existed) {
                // @ts-ignore
                const merged = breadcrumbs.filter((_breadcrumb) => tobeRemovedBreadcrumb.level !== _breadcrumb.level)
                // @ts-ignore
                merged.sort((a, b) => a.level - b.level);
                dispatch({payload: {breadcrumbs: merged}})
                removeBreadcrumb(null)
            }
        }

    }, [breadcrumbs, tobeAddedBreadcrumb, tobeRemovedBreadcrumb]);


    useEffect(() => {

    }, [breadcrumbs, tobeAddedBreadcrumb]);


    const setBreadcrumbs = (breadcrumbs: BreadCrumb[]) => {
        dispatch({payload: {breadcrumbs}})
    }

    return {breadcrumbs, setBreadcrumbs, addBreadcrumb, removeBreadcrumb}
}


export function MountBreadcrumb({breadcrumb}: {breadcrumb: BreadCrumb}): React.ReactNode {

    const { dispatch } = useContext(GlobalStore)

    useEffect(() => {


        // @ts-ignore
        dispatch({action: "addBreadcrumb", breadcrumb, payload: {}})

        return () => {
            // @ts-ignore
            dispatch({action: "removeBreadcrumb", breadcrumb, payload: {}})
        }
    }, [breadcrumb]);

    return <></>
}
