/*
* @file RightMenu.jsx
* @author jansora
*/
import React, {useState} from 'react';
import {Dropdown, Icon} from "semantic-ui-react";
import Confirm from "../Confirm";
import {DeletePost} from "../../request/post";
import {useHistory} from "react-router-dom";

const RightMenu = (props) => {

  const {post, parentId, menus, resource, topic} = props;
  const [deleteDoc, setDeleteDoc] = useState(false);
  const history = useHistory();
  const go = () => topic ? history.push(`/topic/${topic}/${post.url}/edit`) : history.push(`/post/${post.url}/edit`)

  return (
      <React.Fragment>
        <Dropdown
            pointing="top right"
            style={{float: "right"}}
            trigger={<><Icon name='setting' size="large" /></>}
            icon={null}
        >

          <Dropdown.Menu>
              {
                  menus && menus.includes('edit') && <Dropdown.Item
                    icon="edit" text="编辑文档" onClick={go}
                  />

              }
              {
                  menus && menus.includes('delete') && <Dropdown.Item
                      onClick={() => setDeleteDoc(true)} icon='trash alternate' text='删除' />
              }
          </Dropdown.Menu>
        </Dropdown>

         { deleteDoc && <Confirm success={()=> DeletePost(post.id,      ()=>history.push("/post")) } content={'你确定要删除吗？'}/>}
      </React.Fragment>
  )
}
export default RightMenu;
