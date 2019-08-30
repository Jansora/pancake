import styled from "styled-components";

export const ProjectsWrapper = styled.main`
    padding-top: 50px;
    margin: auto;
    // background: white;

    max-width: 1000px;
    div.tool-bar{
      display: none;
    }
`

export const Loading = styled.div`
         height: 400px;
         align-self: center;
         display: flex;
         align-items: center;
         justify-content: center;
         // background: white;
   `

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
         p{
         
         }
         // height: 200px;
         padding:16px 0 16px 16px;
         // background: white;
   `

export const IFrame = styled.iframe`
    padding-top: 50px;
    
    min-height: calc(100vh - 101px);

    width: 100vw;
`