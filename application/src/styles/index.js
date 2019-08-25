
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
    height: calc(100vh - 51px);
    // overflow: scroll;

    animation: ${scala} 200ms;
    
`


