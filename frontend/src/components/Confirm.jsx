/*
* @file Confirm.jsx
* @author jansora
* @date 2020/2/18
*/


import React, {useState} from "react";

import {Confirm as ConfirmModal} from "semantic-ui-react";

const Confirm = (props) => {
    const {success, fail, content} = props;
    const [open, setOpen] = useState(true);


    return (
        <ConfirmModal
            open={open}
            cancelButton="取消"
            confirmButton="确定"
            size="mini"
            onCancel={() => {setOpen(false); fail && fail()}}
            onConfirm={() => {setOpen(false); success && success()}}
            content={content}
        />
    )
}

export default Confirm;
