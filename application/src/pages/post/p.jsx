import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";

import HorizontalTab from '../../components/HoriziontalTab'
import {PostWrapper, Article, TabWrapper, Comment, TopicInPost} from "../../styles/post";
import connect from "react-redux/es/connect/connect";

import {Link, withRouter} from 'react-router-dom';


import {client, format} from "../../utils/requests";
import {Loading} from "../../styles/post";


import CircularProgress from "@material-ui/core/CircularProgress";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

import IconButton from '@material-ui/core/IconButton';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import MoreVertIcon from '@material-ui/icons/MoreVert';


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {classes} from "../../utils/Router";



import Anchor from 'antd/es/anchor'; // 加载 JS
import 'antd/es/anchor/style/css';


import * as moment from 'moment';
import 'moment/locale/zh-cn';
import ArrowUpwardIcon from "@material-ui/core/SvgIcon/SvgIcon";
import CardMedia from "@material-ui/core/CardMedia";
import {Content} from "../../styles/topic";
import Card from "@material-ui/core/Card";
moment.locale('zh-CN');


const P = (props) => {
    const dispatch = (type, payload) => props.dispatch({type, payload});
  

    const {url, topic} = props.match.params;
    console.log(props.match.params)
    const breadcrumb = topic
      ? props.breadcrumb.concat(
          [
            {label: props.breadcrumb[props.breadcrumb.length - 1].label + '/' + topic + '/' + url, value: '获取中'},
            {label: props.breadcrumb[props.breadcrumb.length - 1].label + '/' + topic + '/' + url, value: '获取中'},
          ]
        )
      : props.breadcrumb;
  
  const [Id, setId] = React.useState('');
    const [Author, setAuthor] = React.useState('');
    const [Create_time, setCreate_time] = React.useState('');
    const [Modify_time, setModify_time] = React.useState('');

    const [Site, setSite] = React.useState('');
    const [Read_num, setRead_num] = React.useState('');
    const [Like_num, setLike_num] = React.useState('');
    const [Tags, setTags] = React.useState('');
    
    const [Is_public, setIs_public] = React.useState('');
    const [Logo_url, setLogo_url] = React.useState('');
    const [Summary, setSummary] = React.useState('');
    const [Title, setTitle] = React.useState('');
    
    const [Content, setContent] = React.useState('');
  
    const [Comments, setComments] = React.useState([]);
    const [From, setFrom] = React.useState('');
    const [ReplyId, setReplyId] = React.useState(0);
    const [ReplyTo, setReplyTo] = React.useState('');
    const [ReplyTime, setReplyTime] = React.useState('');
    const [ReplyContent, setReplyContent] = React.useState('');
    const [AvatarUrl, setAvatarUrl] = React.useState('');
  
    const [SiteUrl, setSiteUrl] = React.useState('');
    
    const [active, setActive] = React.useState('');
  // id: Math.random().toString().slice(2,12),

  
  
  
  
  const [loading, setLoading] = React.useState(false);
    
    
    
    const [Anchors, setAnchors] = React.useState([]);
  
    
    const [Topic, setTopic] = React.useState([]);
  
    
    
    useEffect(()=>{
      setLoading(true)
      client.get(`/Article/${url}`)
        .then(r => {
            if (r.data.ret) {
              const data = r.data.res;
              setId(data.Id);
              setAuthor(data.Auchor);
              setCreate_time(data.Create_time);
              setModify_time(data.Modify_time);
    
              setSite(data.Site);
              setRead_num(data.Read_num);
              setLike_num(data.Like_num);
              setTags(data.Tags);
              setIs_public(data.Is_public);
              setLogo_url(data.Logo_url);
              setSummary(data.Summary);
              setTitle(data.Title);
              setContent(data.Content);
              setComments(data.Comment.map(c => JSON.parse(c)))
              breadcrumb[breadcrumb.length - 1] = {...breadcrumb[breadcrumb.length - 1], value: data.Title}
              console.log(breadcrumb)
              dispatch('breadcrumb', breadcrumb);
              updateToc()
            }
            
          }
        ).catch(e => {
          console.log(e);
        }).finally(()=> {
          setLoading(false)
        })
      
      if(topic) {
        client.get(`Topic/${topic}`).then((r) => {
            if (r.data.ret) {
              breadcrumb[breadcrumb.length - 2] = {...breadcrumb[breadcrumb.length - 2], value: r.data.res.Name }
              dispatch('breadcrumb', breadcrumb);
              setTopic(r.data.res)
            }
          }
        ).catch(e => {
        })
      }
      
    }, [url])
  
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
      AvatarUrl: AvatarUrl,
      SiteUrl:  SiteUrl,
      children: [],
    }
    if(From.length > 10 || From.length < 3){
      dispatch('message', {show: true, type: 'error', content: `昵称格式不正确`});
  
      setTimeout(()=> dispatch('message', {show: false, type: 'error', content: `昵称格式不正确`}), 1000);
      return
    }
  
    if(!SiteUrl.startsWith('http') && SiteUrl.length !== 0){
      dispatch('message', {show: true, type: 'error', content: `个人主页格式不正确`});
      setTimeout(()=> dispatch('message', {show: false, type: 'error', content: `个人主页格式不正确`}), 1000);
      return
    }
    
    if(ReplyContent.length > 2000){
      dispatch('message', {show: true, type: 'error', content: `评论正文长度应小于2000字符`});
    
      setTimeout(()=> dispatch('message', {show: false, type: 'error', content: `评论正文长度应小于2000字符`}), 1000);
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
        console.log(item)
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
        dispatch('message', {show: true, type: 'success', content: `评论成功`});
        setTimeout(()=> dispatch('message', {show: false, type: 'error', content: `评论成功`}), 1000);
  
      }
    })
    
  }
  const renderComment = (comments) => {
    
    return comments.map((comment, index) => {
      return <div className='item' key={index}>
        <Avatar component='div' className='avatar'>{comment.From && comment.From[0]}</Avatar>
        <div className='content'>
          <div className='title'>
            <a className='name'>{comment.From}</a>
            <span className='date'>{moment(comment.ReplyTime).fromNow()}</span>
          </div>
          <div className='text'>
            {comment.Content}
          </div>
          <a className='reply' onClick={()=> {
            setReplyTo(comment.From); setReplyId(comment.id);
            document.querySelector('#new-comment').scrollIntoView({ behavior: 'smooth' });
          }}>回复</a>
          {
            comment.children &&
            renderComment(comment.children)
          }
        </div>
      </div>
    })
  }
  
  return (
          <PostWrapper>
            <Grid container justify={'space-around'} component='div' >
              <Grid component='div' item xs={3}>
                {
                  Topic.hasOwnProperty('Id') &&
                    <TopicInPost>
                  
                      <Card >
                        <CardMedia
                          style={{height: 150}}
                          image={Topic.Logo_url}
                          title={Topic.Description}
                        />
                        <div className='card'>
                          <h2>{Topic.Name}</h2>
                          <p> {Topic.Description}</p>
                          <div className='link-group'>
                            {
                              Topic.ArticleObjects.map((e, index) => {
                                const level = parseInt(Topic.Articles[index].split("level:")[1].split("}"));
                                const paths = breadcrumb[breadcrumb.length - 1].label.split('/');
                                paths[paths.length - 1] = e.Url;
                                return <Link to={paths.join('/')}  className={`level${level}`} key={e.Url}>{e.Title}</Link>
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
                <Article value={Content}/>
  
                {
                  !loading &&
                  <Comment id={"Comments"}>
                    {
                      Comments.length > 0 &&
                      <>
                        <h3>评论栏</h3>
                        <Divider component='div'/>
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
                      labels={['目录', '属性']}
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
                        <Anchor onClick={(e,f) => e.preventDefault()} offsetTop={60} style={{marginLeft: 0}}>
                          {
                            Anchors.map((e, index) => {
                              return <Anchor.Link
                                key={index} href={`#${e.id}`}
                                title={
                                  <span style={{marginLeft: 28 * (parseInt(e.id[8]) -1), fontWeight:e.id[8] === "1" ? "bold" :"normal"  }}>{e.text}</span>
                                }
                              />
                            })
                          }
                          <Anchor.Link
                            href={`#Comments`} style={{marginLeft: 20}}
                            title={<span style={{marginLeft: 0, fontWeight:"bold"}}>评论栏</span>}
                          />
                        </Anchor>
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

const mapStateToProps = state => ({

});
export default connect(
  mapStateToProps,
)(withRouter(P));
