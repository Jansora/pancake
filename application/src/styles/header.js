import styled, {keyframes} from "styled-components";

export const Rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const HeaderWrapper = styled.header`
    position: fixed;
    height: 50px;
    width:  calc(100vw);
    padding: 5px 20px;
    background: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    z-index: 1000;
`;


export const Left = styled.div`
    position: absolute;
    left: 20px;
    height: 40px;
    z-index: 1000;

    img {
    animation: ${Rotate} infinite 4s linear;
    height: 40px;
    width: 40px;
        display: block;
    padding-bottom: 1px;
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
      color: var(--primary-active-color);
    }
`;

export const Middle = styled.div`
    position: absolute;
    height: 40px;
    line-height:40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    a{
      margin:  0 10px;
    }
    a{
         cursor: pointer;
         color: var(--primary-color);
         background: none;
                 // background-color: rgba(0, 0, 0, 0.08);
         border: none;
    }
    a:hover{
             color: var(--primary-color);
        background-color: rgba(0, 0, 0, 0.08);
    }

    }
    a.active{
      background-color:  var(--primary-color);
      
      color: white;
      // transition: background-color 300ms, color 300ms;
    }
    
`;

export const Right = styled.div`
    position: absolute;
    right: 20px;
    height: 40px;
    line-height: 40px;
    z-index: 1000;
    a {
      padding: 0 5px;
    }
`;

export const Navbar = styled.div`
  width: 40px;
  height: 80px;
  position: fixed;
  right:100px;
  bottom: 50px;
  svg{
    color: #fff;
    background-color: var(--primary-color);
    cursor: pointer;
    margin: 4px;
    padding: 8px;
    box-sizing: content-box;
    border-radius: 4px;
  }
`;