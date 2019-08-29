
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
    min-height: calc(100vh - 51px);
    width: 100%;
    // overflow: scroll;

    animation: ${scala} 200ms;
    
`

export const FooterWrapper = styled.footer`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

