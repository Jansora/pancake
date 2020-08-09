/*
* @file Catalog.jsx
* @author jansora
* @date 2020/2/16
*/

import React from 'react';

import {message, Tree} from "antd";
import RightMenu from "./RightMenu";
import {NavLink, useHistory} from "react-router-dom";

import styled from "styled-components";
import {Icon, Menu} from "semantic-ui-react";
import {QueryCatalogs, UpdateCatalog} from "../../../request/catalog";
import GetTheme from "../../../components/hooks/GetTheme";


const CatalogWrapper = styled.div`

  .ant-tree {
    font-size: 12px;
  }
  .ant-tree li ul {
      margin: 0;
      padding: 0 0 0 10px;
  }
  margin-left: -6px;
    >ul {

       padding: 0 9px 9px 12px;

       span.ant-tree-node-content-wrapper {
          width: calc(100% - 24px);
          height: 30px;
          line-height: 30px;
          padding: 0;
       }
       span.ant-tree-switcher{
          height: 30px;
          line-height: 30px;
       }
       i.ant-tree-switcher-icon{
            font-size: 19px !important;
            line-height: 30px;
            height: 30px;
            padding-top: 4px;
       }
       span.ant-tree-node-content-wrapper:hover{
          color: var(--primary-color);
          background: none;
          div.ui.dropdown{
              display: inline-block;
          }
           div.background {
              background-color: hsla(0,0%,89.8%,.4);
           }
       }

       // 被选中的
       span.ant-tree-node-selected {
          //padding: 5px 0;
          color: var(--primary-color) !important; 
          a, span.title {
            color: var(--primary-color) !important; 
          }
          div.ui.dropdown{
              display: inline-block;
          }
          div.background {

             background-color: var(--active-backgroud-color) !important;
          }
          background: none !important;

          //background-color: var(--active-backgroud-color) !important;
       }
    }
`

const TreeItem = styled.div`
  width: calc(100%);
  display: flex;
    >a, span.title {
        flex:  1 1 auto;
        color: rgba(0,0,0,.87);
    }
    >a, span.title {
      height: 30px;
      line-height: 30px;
      outline: none;
      user-select: none;
      max-width: 178px;
        overflow: hidden;
    }
    >a:hover,  span.title:hover{
      font-weight: bold;
      i {
        color: var(--primary-color);
      }
    }
  > i {
    font-size: 15px;
    margin-right: 5px;
  }
  div.background{
    position: fixed;
    left: 0;
    height: 30px;
    width: 248px;
    z-index: -1;

  }
  div.ui.dropdown:not(.visible){
      display: none;
  }
`
const { TreeNode } = Tree;

const Catalog = (props) => {
    const {readOnly, resource, setFetch, visible, sub, topic, Anchors} = props;


    const [catalog, setCatalogs, loading, setLoading] = QueryCatalogs(resource);

    const history = useHistory();
    const theme = GetTheme()
    const onDrag = (args) => {
        const {node, dragNode, dropToGap} = args;
        if(node.props.data.nodeType === 'doc') return message.error("只能拖动到文件夹下面");
        const parentId = dropToGap ? 0 : node.props.data.id;
        const id = dragNode.props.data.id;
        UpdateCatalog({id, parentId}, ()=> setLoading(true));
    }

  const renderAnchorsTreeNodes = data =>
    data.map((item, index) => {
      return <TreeNode
        selectable={true}
        data={item} key={item.id}
        title={
          <TreeItem>
            {
              item.id.startsWith("Anchor-h1") ?
                <Icon name="dot circle" color={theme}/>
                :
                <Icon name="dot circle outline" color={theme} size="tiny" style={{
                  lineHeight: "30px",
                  margin: "0 10px 0 23px"
                }}/>
            }
            <a href={`#${item.id}`}  title={item.title} onClick={() =>
              document.getElementById(`${item.id}`).scrollIntoView({
                block: "center",
                behavior: 'smooth'
              })}

            >
              {item.text}
            </a>
            <div className="background"/>
          </TreeItem>
        }
      />;
    });
    const renderTreeNodes = data =>
        data.map(item => {
            const { meta }  = item;
            return <TreeNode
                    selectable={true}
                    data={item} key={item.id}
                    children={item.children && renderTreeNodes(item.children)}
                    title={
                         <TreeItem>
                             {
                                 item.nodeType === 'folder' && <>
                                     <Icon name={"folder"}/>
                                     <span className="title" title={item.title}>{item.title}</span>
                                     {
                                         !readOnly && <RightMenu
                                             item={item}
                                             callback={() => setLoading(loading)}
                                             menus={['editFolder','doc', 'folder', 'importDoc', 'delete']}
                                             resource={resource} parentId={item.id}
                                         />
                                     }
                                 </>
                             }
                             {
                                 item.nodeType === 'doc' && <>
                                     <Icon name={"file"}/>
                                     <NavLink to={`/topic/${resource}/${meta.url}`}  title={meta.title}>
                                         {meta.title}
                                     </NavLink>
                                     {
                                         !readOnly && <RightMenu
                                             item={item}
                                         menus={['delete']}
                                         resource={resource} parentId={item.id}/>
                                     }
                                 </>
                             }
                             <div className="background"/>
                         </TreeItem>
                    }
            />;
        });

    if (!visible) return null;


    return <Menu vertical secondary fluid style={{padding: "3px 0 2px 5px"}}>
      <Menu.Item
        exact={true}
        name="首页"
        as="a"
      >
        <NavLink to={`/topic/${topic.url}`} exact={true}><Icon name='book' /> {topic.title}</NavLink>
          {
              (!readOnly) && <>

                  <RightMenu
                      callback={() => setLoading(true)}
                      resource={resource} parentId={0}
                      menus={['doc', 'folder', 'importDoc', 'setting', 'deleteTopic']}
                      callback={()=>history.push("/topic")}
                  />

                      </>
          }
      </Menu.Item>
        <CatalogWrapper>
            {/*<Loader content='Loading' active={loading} />*/}
            {
                catalog.length > 0 &&
                <Tree blockNode
                      onDrop={onDrag}
                      defaultExpandAll={true} draggable={!readOnly}>{renderTreeNodes(catalog)}</Tree>
            }

        </CatalogWrapper>
      <Menu.Item as='a'>
        <span><Icon name='list ul' /> 文档大纲 </span>
      </Menu.Item>
      <CatalogWrapper>

        <Tree blockNode
              defaultExpandAll={true} >{renderAnchorsTreeNodes(Anchors)}</Tree>


      </CatalogWrapper>
      </Menu>

}
export default Catalog;
