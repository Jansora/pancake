
import styled, {keyframes} from "styled-components";

const scala = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

export const PageWrapper = styled.main`
    height: calc(100vh - 51px);
    overflow: scroll;
    p{
    margin: 0
    }
    animation: ${scala} 200ms;
    
`


