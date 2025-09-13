"use client"

import React, {useEffect} from "react";

export default function LoadIconFont() {


    const iconfontUrl = '//at.alicdn.com/t/c/font_4631696_ql6irm0w2ld.js'

    useEffect(() => {
        const wrapper = window.document.createElement('div');
        wrapper.setAttribute("id", "init-icon-font")
        window.document.body.appendChild(wrapper);
        const script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = iconfontUrl;
        wrapper.appendChild(script);
    }, []);

    return <></>


}

