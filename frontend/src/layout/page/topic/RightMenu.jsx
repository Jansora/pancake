/*
* @file CatalogDropdownItem.jsx
* @author jansora
*/
import React, {useState} from 'react';
import {Dropdown, Icon} from "semantic-ui-react";
import NewPost from "../../../components/topic/NewPost";
import EditFolder from "../../../components/topic/EditFolder";
import Confirm from "../../../components/Confirm";
import {DeleteCatalog} from "../../../request/catalog";
import AddPostFromExist from "../../../components/topic/AddPostFromExist";
import {DeleteTopic} from "../../../request/topic";


const RightMenu = (props) => {

    const { parentId, menus, resource, callback, item } = props;
    const [openNewPost, setOpenNewPost] = useState(false);
    const [openNewFolder, setOpenNewFolder] = useState(false);
    const [openEditFolder, setOpenEditFolder] = useState(false);
    const [deleteCatalog, setDeleteCatalog] = useState(false);
    const [deleteTopic, setDeleteTopic] = useState(false);
    const [openImportDoc, setOpenImportDoc] = useState(false);
    return (
      <React.Fragment>
        <Dropdown
            pointing="top right"
            style={{float: "right"}}
            trigger={<Icon name='triangle right' />}
            icon={null}
        >
          <Dropdown.Menu>

              {
                  menus && menus.includes('editFolder') && <Dropdown.Item
                      onClick={() => setOpenEditFolder(true)} icon='folder open' text='编辑文件夹' />
              }
              {
                  menus && menus.includes('doc') && <Dropdown.Item
                      onClick={() => setOpenNewPost(true)} icon='file' text='新建文档' />
              }
              {
                  menus && menus.includes('folder') && <Dropdown.Item
                      onClick={() => setOpenNewFolder(true)} icon='folder open' text='新建文件夹' />
              }
              {
                  menus && menus.includes('importDoc') && <Dropdown.Item
                      onClick={() => setOpenImportDoc(true)} icon='folder open' text='导入文档' />
              }
              {
                  menus && menus.includes('deleteTopic') && <Dropdown.Item
                      onClick={() => setDeleteTopic(true)} icon='trash alternate' text='删除专栏' />
              }
              {
                  menus && menus.includes('delete') && <Dropdown.Item
                      onClick={() => setDeleteCatalog(true)} icon='trash alternate' text='删除' />
              }
          </Dropdown.Menu>
        </Dropdown>
          {
              menus && menus.includes('doc') && openNewPost &&
              <NewPost resource={resource} parentId={parentId} toTopic={true} editable={false} open={openNewPost} setOpen={setOpenNewPost} />
          }
          {
              menus && menus.includes('folder') && openNewFolder &&
              <EditFolder resource={resource} parentId={parentId} editable={false} open={openNewFolder} setOpen={setOpenNewFolder} />
          }
          {
              menus && menus.includes('editFolder') && openEditFolder &&
              <EditFolder id={item.id} title={item.title} resource={resource} editable={true} open={openEditFolder} setOpen={setOpenEditFolder} />
          }
          {
              menus && menus.includes('importDoc') && openImportDoc &&
              <AddPostFromExist parentId={parentId} resource={resource} editable={true} open={openImportDoc} setOpen={setOpenImportDoc} />
          }
          { deleteTopic && <Confirm setOpen={setDeleteTopic}
                                    success={()=> DeleteTopic(resource, callback)} content={'你确定要删除吗？'}/>}


          { deleteCatalog && <Confirm setOpen={setDeleteCatalog}  success={()=> DeleteCatalog(parentId, callback)} content={'你确定要删除吗？'}/>}
      </React.Fragment>
    )
};

export default RightMenu;
