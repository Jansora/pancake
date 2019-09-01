
import styled, {keyframes} from "styled-components";

const scala = keyframes`
  from {
    transform: scale(0.8);
  }

  to {
    transform: scale(1);
  }
`;


export const PostsWrapper = styled.main`
    padding-top: 20px;
    max-width: 1000px;
    margin: auto;
    animation: ${scala} 200ms;
        // background-color: white;
`


export const MenuWrapper = styled.div`

    top: 0;
    position: sticky;
    height: 49px;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    a, button, a.visited, button.focus{
         cursor: pointer;
         color: var(--primary-color);
         background: none !important;
         border: none;
    }
    a:hover, a.active,  button:hover, button.active{
      background-color:  var(--primary-color) !important;
      color: white;
    }


`


export const FilterWrapper = styled.div`

    top: 51px;
    position: sticky;
    display: flex;
    border-radius: 8px;
    flex-direction: column;
    background-color: white;
    padding-bottom: 10px;

    // width: 100px;
    p{
       font-size: 15px;
       margin: 10px 20px;
    }
    // padding-left: 10px;
    >div{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        button{
  
        }
    }
    button{
     cursor: pointer;
     color: var(--primary-color);
     background: none;
     border: none;
     margin: 2px 10px; 
     padding: 0 10px;
    }
    button:hover, button.active , button.focus{
     background-color:  var(--primary-color) !important;
     color: white;
    }
`

export const ContentWrapper = styled.div`
    // margin-top: 28px;
    background-color: white;
    display: flex;
    flex-direction: column;
    filter: ${props => props.loading ? 'blur(1px)' : 'none'};
    div.card{
       display: flex;
       height: 150px;
       border-bottom: 1px solid #bababa;
       animation: ${scala} 500ms;
    }
    div.detail{
                    width: calc(100% - 200px);
        // flex: 1 1 auto;

        div.MuiCardContent-root{
            padding: 16px 16px 0 16px;

            height: 100%; //calc(100% - 16px);
            display: flex;
            flex-direction: column;
        }
        a.title{
           display: block;
           color: black;
           font-size: 16px;
           font-weight: bolder;
           margin-bottom: 16px;
        }
        p.summary{
           color: rgba(0, 0, 0, 0.64);
           font-size: 14px;
    
           height: 41px;
           overflow: hidden;
           text-overflow: ellipsis;
           display: -webkit-box;
           -webkit-line-clamp: 2;
           -webkit-box-orient: vertical;
        }
        a.title:hover{
            color: var(--primary-color);
        }
        a.author{
            color: rgba(0, 0, 0, 0.54);
        }
        div.bottom{
            flex: 1 1 auto; 
            display: flex;
            align-items: center;
            justify-content: space-between;
            // height: 30px; 
            font-size: 13px;
            padding: 5px 0 10px 0;
            span.fa{
                display: inline-block;
                padding-right: 5px;
            }
        }
    }
    div.bootstrap-logo{
        
        width: 200px;
        margin: 10px;   

    }
`

export const Loading = styled.div`
         height: 400px;
         position: fixed;
         align-self: center;
         display: flex;
         align-items: center;
         justify-content: center;
         // background: white;
   `