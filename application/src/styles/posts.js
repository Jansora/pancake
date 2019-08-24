
import styled, {keyframes} from "styled-components";

const scala = keyframes`
  from {
    transform: scale(1.1);
  }

  to {
    transform: scale(1);
  }
`;

export const PostsWrapper = styled.main`
    padding-top: 20px;
    max-width: 800px;
    margin: auto;
    overflow-y: scroll;
    overflow-x: hidden;
    animation: ${scala} 200ms;
`

export const TagsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    // width: 100px;
    li{
      // width: 80px;
      margin:  10px 0;
    }
    div.MuiListItemIcon-root{
        min-width: 32px;
        span{
          font-size: 20px;
        }
    }

`

export const FilterWrapper = styled.div`
    margin-top: 28px;

`