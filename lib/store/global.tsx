"use client"

import React, {Context, createContext, useReducer} from 'react';
import fs from 'fs';

import {BreadCrumb, GlobalStoreData} from "@/lib/declares/store";


export const defaultValue: GlobalStoreData = {

    breadcrumbs: [], // 面包屑
    sidebar: null, // 侧边栏

    // 登录用户信息
    user: {

    },

    metadata: {
        modules: []
    },

    // @ts-ignore
    dispatch: null
};




export const GlobalStore: Context<GlobalStoreData> = createContext(defaultValue);


const reducer = (state: GlobalStoreData, action: { action: string, breadcrumb?: BreadCrumb, payload: GlobalStoreData}): GlobalStoreData => {
    let {breadcrumbs} = state
    const breadcrumb = action.breadcrumb || {title: "", level: 0, href: ""}

    // 添加 breadcrumb
    if (action.action === "addBreadcrumb") {

       // @ts-ignore
       const existed = breadcrumbs.filter((_breadcrumb) => _breadcrumb.level === breadcrumb.level).length > 0

       // Check if breadcrumb already exists
        if (existed) {
            breadcrumbs.forEach((_breadcrumb) => {
                if (_breadcrumb.level === breadcrumb.level) {
                    _breadcrumb.title = breadcrumb.title
                    _breadcrumb.href = breadcrumb.href
                    _breadcrumb.children = breadcrumb.children
                }
            })
        }
       else {
            breadcrumbs.push(breadcrumb)
           // @ts-ignore
            breadcrumbs.sort((a, b) => a.level - b.level);
       }

   }
    // 移除 breadcrumb
    if (action.action === "removeBreadcrumb") {
        // @ts-ignore
        const existed = breadcrumbs.filter((_breadcrumb) => _breadcrumb.level === breadcrumb.level).length > 0
        // Check if breadcrumb already exists
        if (existed) {
            // @ts-ignore
            breadcrumbs = breadcrumbs.filter((_breadcrumb) => breadcrumb.level !== _breadcrumb.level)
            // @ts-ignore
            breadcrumbs.sort((a, b) => a.level - b.level);
        }
    }
    return {...state, ...action.payload, breadcrumbs}
}


// @ts-ignore
const GlobalStoreProvider = props => {

    // console.log("GlobalStoreProvider props:", props.initialData)

    const { initialData } = props;
    const [store, dispatch] = useReducer(reducer, { ...defaultValue, ...initialData});


    // @ts-ignore
    store.dispatch = dispatch

    return (
        <GlobalStore.Provider value={store}>
            {props.children}
        </GlobalStore.Provider>
    );
};
export default GlobalStoreProvider;
