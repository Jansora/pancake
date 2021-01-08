import React, {useEffect, useState} from 'react';
import {DeleteNote, FetchNote} from "../../components/request/notebook";
import {Link, useHistory, useParams} from 'react-router-dom';
import {Aside, Head, Label as CustomLabel, Section} from "../../components/styled/frameworks";
import styled from "styled-components";
import {Viewer} from "../../components/editor/bytemd";
import {Button, Icon} from "semantic-ui-react";
import AdminLoginStatus from "../../components/hooks/AdminLoginStatus";
import Confirm from "../../components/Confirm";
import {useResponsive, useTitle} from "ahooks";
import GetTheme from "../../components/hooks/GetTheme";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/05 22:21:26
 */

const Item = styled.div`
  height: 33px;
  padding: 5px 0 5px 10px;
  line-height: 21px;
  cursor: pointer;
    font-size: 12px;

    white-space: nowrap;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  i {
      margin-right: 5px;
      color: var(--primary-color);
  }
  :hover {
    background: rgba(0,0,0,.04);
  }
  
  div.ui.label {
    float: right;
    font-size: 6px;
    border-radius: 17px;
    margin: 2px 5px 0 0;
  }
`

const SubItem = styled.div`
  height: 33px;
  padding: 5px 0 5px 30px;
  line-height: 21px;
  cursor: pointer;
  //margin-left: 25px;
    white-space: nowrap;
      display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 10px;
  i {
      margin-right: 5px;
  }
  :hover {
    background: rgba(0,0,0,.04);
  }
  
  div.ui.label {
    float: right;
    font-size: 6px;
    border-radius: 17px;
    margin: 2px 5px 0 0;
  }
`
const Note = (props) => {
  const { id } = useParams();
  const [note] = FetchNote(id)
  const [Anchors, setAnchors] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const history = useHistory();
  const theme = GetTheme()

  useTitle(note.title)
  const responsive = useResponsive();

  const updateToc = () => {
    setTimeout(() => {
      const article = document.querySelector(".markdown-body");
      if(null == article || article.hasAttribute("querySelectorAll")) return;
      const hs = article.querySelectorAll("h1,h2,h3,h4,h5,h6");
      const Anchor = [];

      hs.forEach((item, index) => {
        const h = item.nodeName.substr(0, 2).toLowerCase()
        item.id = `Anchor-${h}-${index}`;
        Anchor.push({id: `Anchor-${h}-${index}`, text: item.textContent});
      })
      setAnchors(Anchor)
    }, 100);
  }
  const adminLoginStatus = AdminLoginStatus();
  const goto = (id) =>
      document.getElementById(id).scrollIntoView({
        block: "center",
        behavior: 'smooth'
      })
  useEffect(() => {
    updateToc()
  }, [note])
  return <React.Fragment>

    <>

      <Aside Display={responsive.middle}>
        <CustomLabel> 文章大纲 </CustomLabel>
        {
          Anchors.map(anchor => {
            if(anchor.id[8] === "1") {
              return <Item key={anchor.id} onClick={() => goto(anchor.id)} > <Icon name="dot circle" /> {anchor.text} </Item>
            }
            return <SubItem key={anchor.id} onClick={() => goto(anchor.id)} > <Icon name="dot circle outline" /> {anchor.text} </SubItem>
          })
        }
      </Aside>
      <Head marginLeft={responsive.middle}>
        <h3>{note.title}</h3>
        <div style={{flex:"1 1 auto"}} />
        {/*{*/}
        {/*  isOwner && menus*/}
        {/*}*/}
        {
          adminLoginStatus &&  <React.Fragment>
            <Button  color={theme} as={Link} to={`/notes/${id}/edit`} style={{marginRight: 50}} size="mini"> 编辑笔记 </Button>
            <Button  color="red" onClick={()=>setDeleteStatus(true)} size="mini"> 删除 </Button>
            { deleteStatus && <Confirm success={()=> DeleteNote(note.id,      ()=> history.push("/notes")) } content={'你确定要删除吗？'}/>}

          </React.Fragment>

        }
      </Head>
      <Section style={{padding: "16px 10%"}} marginLeft={responsive.middle} marginRight={false}>

        <Viewer value={note.raw} />
        {/*<PostContent resource={resource} topic={null} setAnchors={setAnchors}/>*/}
      </Section>
    </>
  </React.Fragment>;
}

export default Note;
