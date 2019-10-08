import React, {useEffect, useState} from 'react';
import {Grid, Tooltip} from "@material-ui/core";

import HorizontalTab from '../../components/HoriziontalTab'
import {TitleWrapper, Article, Comment, Loading, PostWrapper, TabWrapper, TopicInPost} from "../../styles/post";


import {NavLink, withRouter} from 'react-router-dom';


import {client} from "../../utils/requests";


import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';


import {avatars} from "../../components/avatars";

import Anchor from 'antd/es/anchor';
import 'antd/es/anchor/style/css';


import * as moment from 'moment';
import 'moment/locale/zh-cn';
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import {Store} from "../../utils/store";

moment.locale('zh-CN');


const P = (props) => {

    const {dispatch,} = React.useContext(Store);

    const {Topic, location} = props;
    const {url} = props.match.params;

    const [Id, setId] = useState('');
    const [Author, setAuthor] = useState('');
    const [Create_time, setCreate_time] = useState('');
    const [Modify_time, setModify_time] = useState('');

    const [Site, setSite] = useState('');
    const [Read_num, setRead_num] = useState('');
    const [Like_num, setLike_num] = useState('');


    const [Is_public, setIs_public] = useState('');

    const [Title, setTitle] = useState('获取中');

    const [Content, setContent] = useState('');

    const [Comments, setComments] = useState([]);
    const [From, setFrom] = useState('');
    const [ReplyId, setReplyId] = useState(0);
    const [ReplyTo, setReplyTo] = useState('');
    const [ReplyContent, setReplyContent] = useState('');
    const [SiteUrl, setSiteUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [Anchors, setAnchors] = useState([]);



    useEffect(() => {
        const breadcrumb = [];
        if(Topic) {
            breadcrumb.push({label: '/topic', value: '专栏'});
            Topic.hasOwnProperty('Url')
                ? breadcrumb.push({label: '/topic', value: Topic.Name})
                : breadcrumb.push({label: location.pathname, value: '加载中'})
        } else {
            breadcrumb.push({label: '/post', value: '博客'});
        }
        breadcrumb.push({label: location.pathname, value: Title});
        dispatch({type: 'breadcrumb', payload: breadcrumb})
    }, [dispatch, Title, Topic, location.pathname]);

    useEffect(()=>{
      setLoading(true);
      setContent('');
      client.get(`/Article/${url}`)
        .then(r => {
            if (r.data.ret) {
              const data = r.data.res;
              setId(data.Id);
              setAuthor(data.Author);
              setCreate_time(data.Create_time);
              setModify_time(data.Modify_time);

              setSite(data.Site);
              setRead_num(data.Read_num);
              setLike_num(data.Like_num);
              // setTags(data.Tags);
              setIs_public(data.Is_public);
              // setLogo_url(data.Logo_url);
              // setSummary(data.Summary);
              setTitle(data.Title);
              setContent(data.Content);
              setComments(data.Comment.map(c => JSON.parse(c)));

                dispatch({
                    type: 'message',
                    payload: {open: true, variant: 'success', content: `获取数据成功, 本文共有 ${data.Content.length} 字符`, duration: 1000}
                })
              updateToc()
            } else {
                dispatch({
                    type: 'message',
                    payload: {open: true, variant: 'error', content: r.data.res, duration: 2000}
                })
            }

          }
        ).catch(e => {
          console.log(e);
        }).finally(()=> {
          setLoading(false)
        })



    }, [url, dispatch])

    const updateToc = () => {
      setTimeout(() => {
        const article = document.querySelector(".custom-html-style");
        if(null == article) return;
        const hs = article.querySelectorAll("h1,h2");
        const Anchor = [];

        hs.forEach((item, index) => {
          const h = item.nodeName.substr(0, 2).toLowerCase()
          item.id = `Anchor-${h}-${index}`;
          Anchor.push({id: `Anchor-${h}-${index}`, text: item.textContent});
        })
        setAnchors(Anchor)
      }, 1000);
    }



  const addComment = () => {

    let commit = {
      From: From,
      id: Math.random().toString().slice(2,12),
      ReplyId: ReplyId,
      ReplyTo: ReplyTo,
      ReplyTime: Date().toLocaleString(),
      Content: ReplyContent,
      SiteUrl:  SiteUrl,
      children: [],
    }
    if(From.length > 10 || From.length < 3){

        dispatch({
            type: 'message',
            payload: {open: true, variant: 'error', content: `昵称格式不正确`, duration: 1000}
        });
        return
    }

    if(!SiteUrl.startsWith('http') && SiteUrl.length !== 0){

        dispatch({
            type: 'message',
            payload: {open: true, variant: 'error', content: `个人主页格式不正确`, duration: 1000}
        });
        return
    }

    if(ReplyContent.length > 2000){

        dispatch({
            type: 'message',
            payload: {open: true, variant: 'error', content: `评论正文长度应小于2000字符`, duration: 1000}
        });
        return
    }

    const loop = (comment, key, callback) => {
      comment.forEach((item, index, arr) => {
        if (item.id === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    ReplyTo !== "" ?
      loop(Comments, ReplyId, (item) => {
        item.children = item.children || [];
        item.children.unshift(commit);
      })
      : Comments.unshift(commit);

    CommitComment(Comments)
  }
  const CommitComment = (comment) => {

    client.post(`/Comment/Update/${url}`, {
      Comment: comment.map(c => JSON.stringify(c))
    }).then(r => {
      if (r.data.ret) {
        setComments(r.data.res.map(c => JSON.parse(c)))
          dispatch({
              type: 'message',
              payload: {open: true, variant: 'success', content: `评论成功`, duration: 1000}
          });
      } else {
          dispatch({
              type: 'message',
              payload: {open: true, variant: 'error', content: r.data.res, duration: 2000}
          })
      }
    })

  }
  const renderComment = (comments) => {

    return comments.map((comment, index) => {
      return <div className='item' key={index}>
          <Avatar component='div' className='avatar' src={avatars[parseInt(comment.id)%avatars.length]}/>
        <div className='content'>
          <div className='title'>
              <span className='name'>{comment.From}</span>
            <span className='date'>
                <Tooltip title={moment(comment.ReplyTime).format("llll")}>
                    <span>{moment(comment.ReplyTime).fromNow()}</span>
                </Tooltip>
            </span>
          </div>
          <div className='text' style={{color: comment.id === ReplyId ? "red": 'black'}}>
            {comment.Content}
              <span className='reply' onClick={() => {
                  setReplyTo(comment.From); setReplyId(comment.id);
                  document.querySelector('#new-comment').scrollIntoView({ behavior: 'smooth' });
              }}>回复</span>
          </div>

          {
            comment.children &&
            renderComment(comment.children)
          }
        </div>
      </div>
    })
  };



  return (
          <PostWrapper>
            <Grid container justify={'space-around'} component='div' >
              <Grid component='div' item xs={3}>
                {
                  Topic && Topic.hasOwnProperty('Id') &&
                    <TopicInPost>
                      <Card>
                        <CardMedia
                          style={{height: 150}}
                          image={Topic.Logo_url}
                          title={Topic.Description}
                        />
                        <div className='card'>
                          <h2>{Topic.Name}</h2>
                          <p> {Topic.Description}</p>
                          <div className='group'>
                            {
                              Topic.ArticleObjects.map((e, index) => {
                                  const obj = JSON.parse(Topic.Articles[index]);

                                  if(obj.type === 'menu') {
                                      return <span className={`menu`} key={index}>{obj.title}</span>
                                  } else {
                                      const paths = location.pathname.split('/');
                                      paths[paths.length - 1] = e.Url;
                                      return <NavLink to={paths.join('/')} className={`document`} key={index}>
                                                  <Tooltip title={e.Title} >
                                                      <span>{e.Title}</span>
                                                  </Tooltip>
                                             </NavLink>

                                  }
                              })
                            }
                          </div>
                        </div>
                      </Card>
                    </TopicInPost>
                }
              </Grid>
              <Grid component='div' item xs={6}>
                {
                  loading && <Loading><CircularProgress  color="secondary" /></Loading>
                }
                <TitleWrapper>
                    <h1>{Title}</h1>

                </TitleWrapper>

                <Article value={Content}/>

                {
                  !loading &&
                  <Comment id={"Comments"}>
                    {
                      Comments.length > 0 &&
                      <>
                        <h3>评论栏</h3>
                        {/*<Divider component='div'/>*/}
                        {renderComment(Comments)}
                      </>
                    }

                    <h3 id='new-comment'>添加评论</h3>
                    <Divider component='div'/>
                    <Grid container justify={'space-around'} component='div' >
                      <Grid component='div' item xs={5} >
                        <TextField
                          required
                          error={From.length > 10 || (From.length < 3 && From.length !== 0)}
                          label="昵称"
                          id="margin-dense"
                          style={{width: '100%',  margin: '10px auto'}}
                          helperText={
                            From.length > 10 || (From.length < 3 && From.length !== 0)
                              ? "3 <= 长度 <= 20"
                              : "输入昵称"
                          }
                          value={From}
                          onChange={(e) => setFrom(e.target.value)}
                        />
                      </Grid>
                      <Grid component='div' item xs={2} />
                      <Grid component='div' item xs={5} >
                        <TextField
                          // required
                          error={!SiteUrl.startsWith('http') && SiteUrl.length > 0}
                          label="个人主页"
                          value={SiteUrl}
                          onChange={(e) => setSiteUrl(e.target.value)}
                          style={{width: '100%', margin: '10px auto'}}

                          helperText={
                            !SiteUrl.startsWith('http')  && SiteUrl.length > 0
                              ? "请以http开头"
                              : "输入个人主页地址, 请以http开头"
                          }
                        />

                      </Grid>

                      <Grid component='div' item xs={12} >

                        <TextField
                          required
                          error={ReplyContent.length > 1000}
                          label={ReplyTo === '' ? "正文" : `回复 ${ReplyTo}`}
                          multiline
                          rowsMax="6"
                          value={ReplyContent}
                          onChange={(e) => setReplyContent(e.target.value)}

                          style={{width: '100%', marginBottom: 20}}
                          helperText={
                            ReplyContent.length > 1000
                              ? "长度 <= 1000"
                              : "输入正文内容"
                          }
                        />

                      </Grid>

                    </Grid>
                    <Button variant="contained" color="primary"
                            style={{margin: '10px 0 20px 0'}}
                            onClick={addComment}
                    >
                      提交
                      <CloudUploadIcon style={{marginLeft: 15}} />
                    </Button>
                  </Comment>
                }

              </Grid>
              <Grid component='div' item xs={3}>
                {
                  !loading &&
                  <TabWrapper>
                    <HorizontalTab
                        bootstrap
                        centered
                        active={1}
                        labels={['文章大纲', '文章属性']}
                        tabs={[
                        <Anchor onClick={(e,f) => e.preventDefault()} offsetTop={60} style={{marginLeft: 0}}>
                          {
                            Anchors.map((e, index) => {
                              return <Anchor.Link
                                key={index} href={`#${e.id}`}
                                title={
                                  <span style={{marginLeft: 14 * (parseInt(e.id[8]) -1), fontWeight:e.id[8] === "1" ? "bold" :"normal"  }}>{e.text}</span>
                                }
                              />
                            })
                          }
                          <Anchor.Link
                            href={`#Comments`} style={{marginLeft: 20}}
                            title={<span style={{marginLeft: 0, fontWeight:"bold"}}>评论栏</span>}
                          />
                        </Anchor>,
                            <ul className='property'>
                                <li><span>标题：</span>{Title}</li>
                                <li><span>作者：</span>{Author}</li>
                                <li><span>文章ID：</span>{Id}</li>
                                <li><span>创建时间：</span>{Create_time}</li>
                                <li><span>最后更新：</span>{Modify_time}</li>
                                <li><span>发表地址：</span>{Site}</li>

                                <li><span>阅读量：</span>{Read_num}</li>
                                <li><span>点赞数：</span>{Like_num}</li>
                                <li><span>是否公开：</span>{Is_public}</li>
                                <li><span>点赞数：</span>{Like_num}</li>

                            </ul>
                      ]}
                        style={{position: 'fixed'}}
                    />

                  </TabWrapper>
                }

              </Grid>
            </Grid>

          </PostWrapper>
      )

}

export default withRouter(P);
