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
    min-height: calc(100vh - 300px);
    animation: ${scala} 200ms;
    
`;

export const FooterWrapper = styled.footer`
  height: 300px;
  //margin-top: 50px;
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  a, h1, p{
    color: white;
  }
  span{
    color: #dadada;
  }
`;

export const FooterContent = styled.div`
  flex: 1 1 auto;
  height: calc(100% - 24px);
  div.MuiGrid-item{
  margin: 12px;
  }
  div.MuiGrid-justify-xs-space-around{
  flex-wrap: nowrap;
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
   height: 80px;
   display: flex;
   align-items: center;
   justify-content: center;
`;
