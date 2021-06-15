import React from 'react';
import {Card, Image} from "semantic-ui-react";
import styled from 'styled-components'
import {Link} from "react-router-dom";
import {StyledDescription} from "../styled/common";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/27 16:21:02
 */


const StyledWrapper = styled.div`
  > a {
    margin-bottom: 20px;
    img {
      height: 150px !important;
    }
    .header {
      font-size: 1.2rem !important;
    }
    .header, .description {  
      overflow-x: hidden;
      text-overflow:ellipsis; //溢出用省略号显示
      white-space:nowrap; //溢出不换行
    }
    .description {
      -webkit-line-clamp:2;
    }
  }
`

const CardItem = (props) => {

  const {image, title, description} = props;


  return<Wrapper {...props} >
    <Card centered title={description}>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Card.Header as={"h3"}>{title}</Card.Header>
        {/*<Card.Meta>Joined in 2016</Card.Meta>*/}
        <Card.Description>
          <StyledDescription>{description || "......"}  </StyledDescription>
        </Card.Description>
      </Card.Content>
    </Card>
  </Wrapper> ;
}


const Wrapper = (props) => {


  const {href, extra, children, disabled} = props;
  const target = href.startsWith("http") ? "_blank" : "_self";
  if(extra) {
    return <StyledWrapper>
      <a target={target} rel='noopener noreferrer' href={href} disabled={disabled}>
      {children}
    </a>
    </StyledWrapper>
  }
  return <StyledWrapper>
    <Link to={href} disabled={disabled}>
      {children}
    </Link>
  </StyledWrapper>

}

export default CardItem;
