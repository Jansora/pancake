/*
* @file PostItem.jsx
* @author jansora
* @date 2020/2/12
*/


import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {StyledDescription} from "../../components/styled/common";
import * as moment from "moment";
import {Label} from "semantic-ui-react";
import GetTheme from "../../components/hooks/GetTheme";
import * as zhCn from 'moment/locale/zh-cn';
import {useResponsive} from "ahooks";

moment.locales(zhCn)

const NoteWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  border-top: 1px solid rgb(186, 186, 186);
  border-bottom: 1px solid rgb(186, 186, 186);
  background-color: ${props => props.enabled ? "none" : "var( --active-backgroud-color)"};
  div.main{
      width: 100%;
      padding: 10px 20px;
      a.title {
          color: black;
          font-size: 18px;
          font-weight: bolder;
      }
      p.description {
          color: rgba(0, 0, 0, 0.54);
          font-size: 14px;
          height: 58px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 10px 0;
          white-space: pre-line;
      } 
   }
  div.wrapper{
     //flex: 1 1 auto;
     width: 350px;
     display: flex;
     flex-direction: column;
     div.user {
         >div {
          float: right;
         }
         flex: 1 1 auto;
         line-height: 36px;
         a {
            margin-left: 10px;
          }
     }
           div.tag {
          //float: right;
          height: 30px;
          //overflow: visible;
          //position: absolute;
          //margin-top: 93px;
            a.ui.label {
                float: right;
                font-size: 10px;
                border-radius: 17px;
                margin: 2px 5px 0 0;
              }
        }
   
  }
  div.logo {
      width: 235px;
      margin: 10px;
      border-radius: 12px;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url(${props => props.img});
  }

`

const NoteListItem = (props) => {
    const { note, setTag } = props;
    const theme = GetTheme();
  const responsive = useResponsive();

  return (
        <NoteWrapper img={note.logo + '?x-oss-process=style/notes'} enabled={note.enabled}>
          {
            responsive.middle && <div className="logo" />
          }

            <div className="main">
              <Link to={`/notes/${note.id}`} className="title">{note.title}</Link>
                <p className="description">{note.description}</p>
                <div className="bottom">
                  {
                    note.tag &&
                    note.tag.split(",").filter(t => !!t).map(tag =>
                        <Label
                            color={theme}
                            onClick={()=> setTag && setTag(tag)}
                            as="a" key={tag}  >{tag}</Label>)
                  }

                  <StyledDescription> {moment(note.updateAt).fromNow()}</StyledDescription>

                </div>
            </div>


        </NoteWrapper>
    )
}

export default NoteListItem;
