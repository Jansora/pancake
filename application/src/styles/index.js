import styled, {keyframes} from "styled-components";

const scala = keyframes`
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
`;

export const PageWrapper = styled.main`
    padding-top: 51px;
    //overflow: scroll;
    min-height: calc(100vh - 50px);
    animation: ${scala} 200ms;
    
`;

export const FooterWrapper = styled.footer`
  height: 50px;
  //margin-top: 50px;
  display: flex;

   align-items: center;
   justify-content: center;
  background-color: var(--primary-color);
  a, h1, p{
    color: white;
  }
  span{
    color: #dadada;
  }
`;


export const Content = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   margin: auto;
   width: 350px;
   height: 100%;
   h1{
      margin: 14px auto;
   }
`;

export const Backup = styled.div`
   height: 50px;
   display: flex;
   align-items: center;
   justify-content: center;
`;
