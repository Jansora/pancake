/*
* @file SetTitle.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2019-12-26 16:16
*/

import {useContext, useEffect} from "react";
import {GlobalStore} from "../../store/global";

const SetTitle = (title) => {

    document.title = `${title ? title + ' - ' : ''} 张洋源的小窝`

    const {dispatch} = useContext(GlobalStore);


    useEffect(() => {
        const payload = title;
        dispatch({ type: 'title', payload });
    },[dispatch, title]);
};
export default SetTitle;
