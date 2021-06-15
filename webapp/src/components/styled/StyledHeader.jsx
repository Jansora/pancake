import styled from "styled-components";

const StyledHeader = styled.header`
  
  z-index: ${props => !!props.fixed ? "1" : "0"};
  padding: 0 10px;
  height: var(--header-height);
  background: white;
  position: ${props => !!props.fixed ? "fixed" : "unset"};
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.1);
  a {
    margin-right: 10px;
  }
  div.padding {
    flex: 1 1 auto;
  }
`

export default StyledHeader;
