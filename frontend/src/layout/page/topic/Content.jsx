/*
* @file topic.jsx
* @author jansora
* @date 2020/2/11
*/


import React, {useState} from "react";
import {Grid, Icon} from "semantic-ui-react";
import {QueryTopic} from "../../../request/topic";
import SetTitle from "../../../components/hooks/SetTitle";
import GetUser from "../../../components/hooks/GetUser";
import SideBar from "../../../components/SideBar";
import {useHistory} from "react-router-dom";
import Catalog from "./Catalog";
import styled from "styled-components";
import CommentBar from "../../../components/commentbar";
import Empty from "../../../components/Empty";
import Setting from "./pages/setting";
import HorizontalTab from "../../../components/tab/HorizontalTab";
import PostContent from "../../../components/posts/PostContent";


const StyledTopicSideBarControlIcon = styled(Icon)`
  position: absolute !important;
  font-size: 20px !important;
  cursor: pointer !important;
  padding: 10px;
  display: block;
  width: 40px;
  height: 40px;
  z-index: 1;

`

const Content = (props) => {

    const history = useHistory();
    const {resource, sub} = props.match.params;

    const baseUrl = `/topic/${resource}`;


    const [displayCatalog, setDisplayCatalog] = useState(true);
    const [topic, setTopic, loading, setLoading] = QueryTopic(resource)

    const user = GetUser();


    const readOnly = !(user.id === topic.ownerId);

    const [expand, setExpand] = useState('加载中')
    const [Anchors, setAnchors] = useState([]);


    const menus = ['首页', '热门文档', '讨论区', '回收站', '分析', '设置'];
    const menuIcons = ['home', 'fire', 'comment', 'trash', 'chart pie', 'setting'];
    const menusUrl = ['', 'hot',  'discussion', 'recycle', 'analysis', 'setting'];
    const totalMenusUrl = menusUrl.map(url => `${baseUrl}/${url}`);

    const args = {topic, setTopic, loading, setLoading};
    const panes = [<Empty {...args}/>, <Empty {...args}/>,
        <CommentBar parentId={0} ownerType='topic'/>, <Empty {...args}/>, <Empty  {...args}/>, <Setting  {...args}/>];

    SetTitle(topic.title)


    const onTabChange = (activeIndex) => {
        history.push(totalMenusUrl[activeIndex])
    }

    const docPage = sub && !menusUrl.includes(sub)
    return (
        <SideBar
            open={displayCatalog} setOpen={setDisplayCatalog}
            aside={
                <Catalog
                    topic={topic}
                    Anchors={Anchors}
                    sub={sub}
                    visible={displayCatalog} resource={resource}
                         readOnly={readOnly} setFetch={setLoading}/>
            }
        >
            <StyledTopicSideBarControlIcon
              name={`${displayCatalog ? "reply" : "share"}`}
              onClick={()=> setDisplayCatalog(!displayCatalog)}
            />
            <Grid
              style={{height: "calc( 100vh - 34px )", overflowY: "auto", margin: "-1rem 0"}}
              columns='equal'
            >
                <Grid.Column/>
                <Grid.Column width={14}>

                    {
                       docPage ? <PostContent topic={resource} resource={sub} setExpand={setExpand} setAnchors={setAnchors} />
                            :

                        <HorizontalTab
                        activeIndex={
                        menusUrl.indexOf(sub) > -1
                          ? menusUrl.indexOf(sub)
                          : 0
                        }
                        menus={menus}
                        panes={panes}
                        // loading={paneLoading}
                        onTabChange={onTabChange}
                        />

                    }

                </Grid.Column>
                <Grid.Column/>
            </Grid>

        </SideBar>

    )
}

export default Content;
