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


const Books = (props) => {



  useTitle("应用商店")
  return (
      <React.Fragment>


          <Head >
            <h3>知识图谱</h3>
          </Head>

        <Bootstrap >
          <h1>知识图谱</h1>
          <StyledDescription style={{marginLeft: 0}}>这里汇集了众多的知识图谱</StyledDescription>
        </Bootstrap>
        <div style={{padding: "30px 10%"}} >
          <StyledHeader as="h2" > Java </StyledHeader>
          <Grid style={{marginTop: 0}}>
            <CardItem
                image={"https://cdn.jansora.com/img/antd/antd.png"}
                extra={true}
                href={'https://www.yuque.com/jansora/hxgdak/'}
                title={"Spring Cloud"}
                description={'从零到一掌握Spring Cloud'}
            />
            <CardItem
                image={"https://cdn.jansora.com/img/antd/antd.png"}
                extra={true}
                href={'https://www.yuque.com/jansora/ftb5er/'}
                title={"精通 Spring Boot"}
                description={'精通 Spring Boot 而不止 Spring Boot'}
            />
          </Grid>



          <StyledHeader as="h2" style={{marginTop:50}}> 官方文档 </StyledHeader>
          <CardItem
              image={"https://cdn.jansora.com/img/antd/haitu.png"}
              extra={true}
              href={'https://doc.pancake.jansora.com/'}
              title={"Pancake"}
              description={'https://github.com/Jansora/pancake'}
          />
        </div>



      </React.Fragment>
  )
}

export default Books;
