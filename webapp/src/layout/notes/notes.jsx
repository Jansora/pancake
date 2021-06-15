import React, {useEffect, useState} from 'react';
import {Aside, SubHead, Item, Label as CustomLabel, LinkItem, Section} from "../../components/styled/frameworks";
import {
  Button,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Label,
  Loader,
  Placeholder,
  Segment
} from "semantic-ui-react";
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
import StyledHeader from "../../components/styled/StyledHeader";
import CardItem from "../../components/view/CardItem";

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

  const { run: search } = useDebounceFn(
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
    {/*<StyledHeader fixed>*/}
    {/*  <Header as={"h4"} style={{margin: "0 20px 0 0"}}>个人博客</Header>*/}
    {/*  */}
    {/*</StyledHeader>*/}
    <SubHead responsive={responsive}>

      {
        responsive.middle && <>
          {/*<h3>笔记列表</h3>*/}
          <Header as={"h4"} style={{margin: "0 20px 0 0"}}>笔记列表</Header>
          <div style={{flex: '1 1 auto'}} />

          {
            adminLoginStatus &&  <Button size="tiny"  color={theme} as={Link} to="/notes/new"> 新建笔记 </Button>
          }
        </>
      }






    </SubHead>
    <Aside Display={responsive.middle}>

      <React.Fragment>
        <CustomLabel> 检索 </CustomLabel>
        <Input
          size="mini"
          fluid
          icon={
            <Icon name="search"
                  style={{cursor: "pointer"}}
            />
          }
          placeholder="请输入标题来进行模糊搜索"
          loading={loading}
          // value={title}
          onChange={event => search(event.target.value)}
        />
        <Divider />
      </React.Fragment>
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
      <InfiniteScroll
        pageStart={0}
        loadMore={()=> setOffset(notes.length)}
        hasMore={notes.length < total}
        loader={
          <Grid key={1} relaxed columns={responsive.large ? 4 : (responsive.middle ? 3 : 2)}>
            {[1, 2, 3, 5].map(index =>
              <Grid.Column key={index}>
                <Segment raised>
                  <Placeholder>
                    <Placeholder.Header image>
                      <Placeholder.Line/>
                      <Placeholder.Line/>
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length='medium'/>
                      <Placeholder.Line length='short'/>
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Segment>
              </Grid.Column>
            )}
          </Grid>
        }
      >
        <Grid key={2} relaxed columns={responsive.large ? 4 : (responsive.middle ? 3 : 2)}>
          {
            notes.map(note =>
              <Grid.Column key={note.id} style={{background: note.enabled ? "none" : "var(--active-backgroud-color)"}}>
                <CardItem
                  image={note.logo}
                  extra={false}
                  title={note.title}
                  description={note.description}
                  href={`/notes/${note.id}`}
                />
              </Grid.Column>
            )
          }
        </Grid>
      </InfiniteScroll>



    </Section>



  </React.Fragment>;
}

export default Notes;
