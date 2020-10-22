/*
* @file index.jsx
* @author jansora
* @date 2020/2/5
*/


import React from "react";
import SetTitle from "../../../components/hooks/SetTitle";

import CommentBar from "../../../components/commentbar";
import {Grid, Header} from "semantic-ui-react";
import {StyledDescription} from "../../../styled/GlobalStyles";

const Feedback = (props) => {

    SetTitle('反馈列表')


    return (
        <Grid columns="equal">
            <Grid.Column />
            <Grid.Column width={8}>
                <Header style={{marginTop: 50}}>留言板 <StyledDescription>有什么疑问或建议，请在下方留言，谢谢！</StyledDescription>
                </Header>
                <CommentBar parentId={0} ownerType='feedback'/>
            </Grid.Column>
            <Grid.Column />
        </Grid>

    )

}

export default Feedback;