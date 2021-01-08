/*
* @file index.jsx
* @author jansora
* @date 2020/2/16
*/


import React from "react";
import {Head} from "../../components/styled/frameworks";
import {Bootstrap} from "../../components/styled/bootstrap";
import {StyledDescription} from "../../components/styled/common";
import {useResponsive, useTitle} from 'ahooks'


const Inspiration = (props) => {
    const responsive = useResponsive();

    useTitle("灵感乍现")
    return (
        <React.Fragment>
            {/*<Dimmer active={loading} inverted>*/}
            {/*    <Loader active inline='centered' />*/}
            {/*</Dimmer>*/}
            {
                responsive.middle &&
                <Head >
                    <h3>灵感乍现</h3>
                </Head>
            }
            <Bootstrap >
                <h1>灵感乍现</h1>
                <StyledDescription style={{marginLeft: 0}}>这里汇集了众多的闪光点</StyledDescription>
            </Bootstrap>


        </React.Fragment>
    )
}

export default Inspiration;
