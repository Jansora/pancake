import React from 'react';
import {useTitle} from "ahooks";
import {Head} from "../../components/styled/frameworks";
import {Bootstrap} from "../../components/styled/bootstrap";
import {StyledDescription} from "../../components/styled/common";
import {Grid, Header} from "semantic-ui-react";
import CardItem from "../../components/view/CardItem";
import styled from "styled-components";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/26 23:30:35
 */
const StyledHeader = styled(Header)`
  font-weight: 100;
`


const Apps = (props) => {



  useTitle("应用商店")
  return (
      <React.Fragment>
        {/*<Dimmer active={loading} inverted>*/}
        {/*    <Loader active inline='centered' />*/}
        {/*</Dimmer>*/}

          <Head >
            <h3>应用商店</h3>
          </Head>

        <Bootstrap >
          <h1>应用商店</h1>
          <StyledDescription style={{marginLeft: 0}}>这里汇集了有意思的应用</StyledDescription>
        </Bootstrap>

        <div style={{padding: "30px 10%"}} >
          <StyledHeader as="h2" > 代码提效 </StyledHeader>
          <Grid columns="equal" style={{marginTop: 0}}>
            <CardItem
                image={"https://cdn.jansora.com/img/antd/antd.png"}
                extra={true}
                href={'/app-store/playground'}
                title={"代码演练场"}
                description={'快速测试 Java Go Python Nodejs 代码'}
            />
          </Grid>



          <StyledHeader as="h2" style={{marginTop:30}}> 数据分析 </StyledHeader>
          <CardItem
              image={"https://cdn.jansora.com/img/antd/haitu.png"}
              extra={false}
              href={'/app-store/GeoGebra'}
              title={"GeoGebra"}
              description={'根据数学公式绘制图像'}
          />
          <StyledHeader as="h2" style={{marginTop:30}}> 个人精藏 </StyledHeader>
        </div>



      </React.Fragment>
  )
}

export default Apps;
