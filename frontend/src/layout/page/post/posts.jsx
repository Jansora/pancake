/*
* @file posts.jsx
* @author jansora
* @date 2020/2/5
*/


import React, {useEffect} from "react";
import {QueryPosts, QueryTags} from "../../../request/post";
import {Button, Grid, Icon, Input, Label, Loader, Menu, Select} from "semantic-ui-react";
import GetTheme from "../../../components/hooks/GetTheme";
import {MenuOptions} from "../../../styled/posts";
import PostItem from "../../../components/posts/PostItem";

import * as moment from 'moment';
import 'moment/locale/zh-cn';
import Empty from "../../../components/Empty";
import {useDebouncedCallback} from "use-debounce";
import SetTitle from "../../../components/hooks/SetTitle";

moment.locale("zh-CN");
const Posts = (props) => {
    SetTitle('博客列表' )
    const theme = GetTheme();

    const [title, setTitle] = React.useState('');
    const [tag, setTag] = React.useState('所有');
    const [offset, setOffset] = React.useState(0);

    const [orderBy, setOrderBy] = React.useState('update_at');
    const [sort, setSort] = React.useState('DESC');



    const [tags] = QueryTags();
    const [posts, setPost, total, lock, setLock, loading] = QueryPosts(tag, title, offset, orderBy, sort, setOffset);

    const orderByOptions = [
        {key: 1, value: "title", text: "标题"},
        {key: 2, value: "like_num", text: "点赞数"},
        {key: 3, value: "read_num", text: "阅读量"},
        {key: 4, value: "create_at", text: "创建时间"},
        {key: 5, value: "update_at", text: "更新时间"},
    ]


    const sortOptions = [{key: 1, value: "ASC", text: "升序"}, {key: 2, value: "DESC", text: "降序"}]

    useEffect(()=> {
        setTitle('')
    }, [tag])


    const autoSearch = (value) => {
        setPost([]);setOffset(0);setLock(false)
    }


    const [autoSearchDebounce] = useDebouncedCallback(autoSearch, 1000);


    return (
        <Grid columns="equal" style={{marginTop:30}}>
            <Grid.Column/>
            <Grid.Column width={3}>
                <Menu vertical secondary size="small"
                      style={{position: "sticky", top: 50, height: "80vh", overflow: "scroll"}}
                >
                    {
                        tags.map(item => <Menu.Item
                                key={item[0]}
                                onClick={() => setTag(item[0])}
                                active={tag === item[0]}
                                className={tag === item.alias ? 'active' : ''}
                            >
                                <Label color={theme}>{item[1]}</Label>
                                {item[0]}
                            </Menu.Item>
                        )
                    }
                </Menu>
            </Grid.Column>
            <Grid.Column width="8">

                <MenuOptions>
                    <Input icon={
                        <Icon name="search"
                              style={{cursor: "pointer"}}

                        />
                    }
                           value={title}
                           onChange={event => setTitle(event.target.value) || autoSearchDebounce()}
                    />

                    <Select
                     options={orderByOptions} value={orderBy} style={{width: 100}}
                            onChange={(_, {value}) => setOrderBy(value)} />
                    <Select options={sortOptions} value={sort}
                            onChange={(_, {value}) => setSort(value)}
                    />
                </MenuOptions>
                <Loader content='Loading' active={loading} />

                {
                  posts.map(post =>  <PostItem setTag={setTag} key={post.id} post={post}/>)
                }

                {
                    posts.length > 0 && posts.length < total ?
                    <Button
                        onClick={()=> setOffset(posts.length)}
                        fluid color={theme} style={{marginTop: 20}}
                    >
                        点击查看更多
                    </Button>
                        :
                    (
                          !loading &&
                          <Empty style={{height: 150, minHeight: 150}} description={"没有更多数据了"}/>
                    )
                }



            </Grid.Column>
            <Grid.Column width={2}/>
            <Grid.Column/>
        </Grid>
    )
}

export default Posts;
