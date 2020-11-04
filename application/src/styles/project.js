import styled from "styled-components";

export const ProjectsWrapper = styled.main`
    padding-top: 50px;
    margin: auto;

    max-width: ${props => props.isDesktop ? '1200px' : '100vw'};
    div.tool-bar{
      display: none;
    }
`;

export const Loading = styled.div`
    position: fixed;
    left: 50vw;
    top: 50vh;
`;

export const Content = styled.div`
    a.title{
    display: block;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    }
    span.date{
      line-height: 17px;
      font-size: 12px;
      color: #999;
    }
    padding:16px 0 16px 16px;

`;

export const IFrame = styled.iframe`
    height: 800px;
    width: ${props => props.isDesktop ? '100%' : '90%'};
    margin: auto;
    border: none;
`;

export const IFrameWrapper = styled.div`
    max-width: ${props => props.isDesktop ? '1200px' : '100vw'};
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    h1{
      margin: 14px;
      a{
        font-size: 12px;
        margin-left: 100px;
      }
    }
    p{
      align-self: flex-start;
      margin: 10px 50px;
    }
`;