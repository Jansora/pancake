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
    position: fixed;
    height: 50px;
    width:  100vw;
    padding: 5px 20px 5px;
    background: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    z-index: 1000;
`


export const Left = styled.div`
    position: absolute;
    float: left;
    height: 40px;
    z-index: 1000;

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
    a.active{
      font-weight: bolder;
    }
`

export const Middle = styled.div`
    position: absolute;
    height: 40px;
    line-height:40px;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 999;
    a{
      margin:  0 25px;
    }
`

export const Right = styled.div`
    // position: absolute;
    float:right;
    height: 40px;
    line-height: 40px;
    z-index: 1000;
    a {
      padding: 0 5px;
    }
`

export const Navbar = styled.div`
  width: 40px;
  height: 80px;
  position: fixed;
  right:100px;
  bottom: 50px;
  svg{
    color: #fff;
    background-color: var(--primary-color);//rgba(0, 0, 0, 0.87);
    cursor: pointer;
    margin: 4px;
    padding: 8px;
    box-sizing: content-box;
    border-radius: 4px;
  }
`