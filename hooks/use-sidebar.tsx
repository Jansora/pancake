import React, {useContext, useEffect} from "react"
import {GlobalStore} from "@/lib/store/global";

export function useSidebar() {
    const {sidebar, dispatch} = useContext(GlobalStore)

    const setSidebar = (sidebar: React.ReactNode) => {
        dispatch({payload: {sidebar}})
    }


    return {sidebar, setSidebar}
}


export function SetSidebar({children, refresh}: {children: React.ReactNode, refresh?: boolean}): React.ReactNode {
    const {setSidebar} = useSidebar()

    useEffect(() => {
        setSidebar(children)
        return () => {
            setSidebar(null)
        }
    }, [refresh]);

    return <></>
}