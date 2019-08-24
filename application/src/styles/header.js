import styled, {keyframes} from "styled-components";

export const Rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

export const HeaderWrapper = styled.header`

    height: 50px;
    padding: 0 20px;
    display: flex;
    align-items: center;
`


export const Left = styled.div`
    position: fixed;
    top: 5px;
    left: 10px;
    height: 40px;
    z-index: 1000;
    display: flex;
    img {
    animation: ${Rotate} infinite 4s linear;
    height: 40px;
    width: 40px;
    }
    img:hover {
        animation-play-state: paused;
    }
    nav, ol, a, li, p{
        height: 40px;
        line-height: 40px;
    }
    a{
      font-size: 13px;
    }
`

export const Right = styled.div`
    position: fixed;
    top: 5px;
    right: 10px;
    height: 40px;
    line-height: 40px;
    z-index: 1000;
    a {
      padding: 0 5px;
    }
`
