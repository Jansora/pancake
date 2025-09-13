"use client"

import {useContext} from "react";
import {GlobalStore} from "@/lib/store/global";

export const isClientLogged = () => {
    return !!getClientUser().id
}

export const getClientUser = () => {
    const { user } = useContext(GlobalStore) || {};

    return user;
}


