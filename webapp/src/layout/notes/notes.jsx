import React, {useEffect, useState} from 'react';
import {Aside, Head, Item, Label as CustomLabel, LinkItem, Section} from "../../components/styled/frameworks";
import {Button, Dimmer, Header, Icon, Input, Label, Loader, Placeholder, Segment} from "semantic-ui-react";
import NoteListItem from "./NoteListItem";
import {Link, useLocation} from "react-router-dom";
import AdminLoginStatus from "../../components/hooks/AdminLoginStatus";
import GetTheme from "../../components/hooks/GetTheme";
import {Icons} from '../../components/constants/icons'
import InfiniteScroll from 'react-infinite-scroller';
import {FetchClassifies, FetchClassifyCount, FetchNotes, FetchRelationTags} from "../../components/request/notebook";
import {useDebounceFn, useResponsive, useTitle} from "ahooks";
import {Bootstrap} from "../../components/styled/bootstrap";
import {StyledDescription} from "../../components/styled/common";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/05 15:57:40
 */

const orders = [
  {name: "标题", icon: "yelp", value: "title"},
  // {name: "点赞数", icon: "typo3", value: "like_num"},
  // {name: "阅读量", icon: "hotjar", value: "read_num"},
  {name: "创建时间", icon: "clock", value: "create_at"},
  {name: "更新时间", icon: "clock", value: "update_at"}
]

const sorts = [
  {name: "正序", icon: "sort amount down", value: "ASC"},
  {name: "倒序", icon: "sort amount up", value: "DESC"},
]


const Notes = (props) => {
  const responsive = useResponsive();

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [classify, setClassify] = useState(null);
  const [offset, setOffset] = useState(0);

  const [orderBy, setOrderBy] = useState('update_at');
  const [sort, setSort] = useState('DESC');

  const [classifies, setClassifies, classifiesLoading] = FetchClassifies();
  const [relationTags, relationTagsLoading] = FetchRelationTags(classify);


  const [notes, setNotes, total, setLock, loading] = FetchNotes(classify, tag, title, offset, orderBy, sort, setOffset);

  const {pathname} = useLocation();

  useEffect(() => {
    if(pathname === "/notes") {
      setTag("")
    }
  }, [pathname])
  // const getCount = (name) => {
  //   const filters = classifyCounts.filter(classifyCount => classifyCount.name === name);
  //   if(filters.length > 0) return filters[0].count;
  //   return 0;
  // }
  const autoSearch = (value) => {
    setTitle(value)
    setNotes([]);setOffset(0);setLock(false)
  }

  const { run } = useDebounceFn(
      autoSearch,
      {
        wait: 1000,
      },
  );


  const adminLoginStatus = AdminLoginStatus();

  const theme = GetTheme();
  useTitle("笔记列表")


  console.log(classifies)
  return <React.Fragment>
    <Head responsive={responsive}>

      {
        responsive.middle && <>
          <h3>笔记列表</h3>
          <div style={{flex: '1 1 auto'}} />

          {
            adminLoginStatus &&  <Button size="tiny"  color={theme} as={Link} to="/notes/new"> 新建笔记 </Button>
          }
        </>
      }






    </Head>
    <Aside Display={responsive.middle}>
      <CustomLabel> 笔记 </CustomLabel>
      <LinkItem to="/notes" className={tag === '' && classify === null ? 'active' : ''} onClick={() => setTag('') || setClassify(null)}
      > <Icon name="th" /> 查看所有 <Label size="tiny">{classifies.map(classify_ => classify_[1]).reduce((a,b ) => a + b, 0)}</Label></LinkItem>
      <CustomLabel> 分类 </CustomLabel>
      <Dimmer active={classifiesLoading || relationTagsLoading} inverted>
        <Loader active inline='centered' />
      </Dimmer>
      {
        classifies.map((classify_, index) => <Item
            key={classify_[0]}
            onClick={() => setClassify(classify_[0])}
            className={classify === classify_[0] ? 'active' : ''}
        >
          <Icon name={Icons[index % Icons.length]} /> {classify_[0]}     <Label size="tiny">{classify_[1]}</Label>

        </Item>)
      }

      <div style={{flex: '1 1 auto'}} />

    </Aside>
    <Aside Display={responsive.large} right={true}>
      <CustomLabel> 排序 </CustomLabel>
      {
        sorts.map(s => <Item
            key={s.name}
            onClick={() => setSort(s.value)}
            className={sort === s.value ? 'active' : ''}
        >
          <Icon name={s.icon} /> {s.name}
        </Item>)
      }
      <CustomLabel> 排序类型 </CustomLabel>
      {
        orders.map(o => <Item
            key={o.name}
            onClick={() => setOrderBy(o.value)}
            className={orderBy === o.value ? 'active' : ''}
        >
          <Icon name={o.icon} /> {o.name}
        </Item>)
      }

      <CustomLabel> 关联画像 </CustomLabel>
      {
        relationTags.map((relationTag, index) => <Item
            key={relationTag[0]}
            onClick={() => setTag(relationTag[0])}
            className={tag === relationTag[0] ? 'active' : ''}
        >
          <Icon name={Icons[index % Icons.length]} /> {relationTag[0]}     <Label size="tiny">{relationTag[1]}</Label>

        </Item>)
      }


    </Aside>


    <Section style={{padding: responsive.large ? "0 84px" : " 0 32px"}} marginRight={responsive.large}  marginLeft={responsive.middle}>

      <Bootstrap style={{margin:responsive.large ? "0 -84px 20px " : " 0 -32px 20px", height: 200}}>
        <h1>检索笔记</h1>
        <StyledDescription style={{marginBottom: 20}}>基于标题模糊搜索</StyledDescription>
        <Input
            size="mini"
            style={{width: responsive.middle ? "350px" :"100%"}}
            icon={
              <Icon name="search"
                    style={{cursor: "pointer"}}
              />
            }
            placeholder="请输入标题来进行模糊搜索"
            loading={loading}
            // value={title}
            onChange={event => run(event.target.value)}
        />

      </Bootstrap>

      <InfiniteScroll
          pageStart={0}
          loadMore={()=> setOffset(notes.length)}
          hasMore={notes.length < total}
          loader={ [1,2,3].map(index =>
              <Segment raised key={index}>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length='medium' />
                    <Placeholder.Line length='short' />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
          )}
      >
        {
          notes.map(note =>  <NoteListItem setTag={setTag} key={note.id} note={note}/>)
        }
      </InfiniteScroll>


      {
          !loading && notes.length === total &&
          <Segment placeholder>
            <Header icon>
              <Icon name='search' />
              {/*已经找不到更多笔记了,*/}
              没有了, 真的到底了 :)
              {/*We don't have any documents matching your query.*/}
            </Header>
            <Segment.Inline>
              {/*<Button primary>Clear Query</Button>*/}
              {
                adminLoginStatus  &&  <Button color={theme} as={Link} to="/notes/new">Add Document</Button>

              }

            </Segment.Inline>
          </Segment>

      }
    </Section>



  </React.Fragment>;
}

export default Notes;
