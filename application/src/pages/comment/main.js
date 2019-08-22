 import React, { Component } from 'react';


import connect from "react-redux/es/connect/connect";



import {client} from './../../components/requests';


import {Item, Container, Divider,
  Header, Label, Icon ,Popup ,
  Button, Comment, Form, Grid, Dimmer} from 'semantic-ui-react';

import { Route, Link, NavLink, Switch ,withRouter} from "react-router-dom";



import "./Comments.less"


import {updatePost} from "../../redux/actions/post";
 import {updateApp} from "../../redux/actions/app";

 import * as moment from 'moment';
 import 'moment/locale/zh-cn';
 moment.locale('zh-CN');
const initCommit = {
  From: "Jansora",
  ReplyTo:"你",
  ReplyTime:"Now",
  Content:"如有疑问，请在右侧留言",
  AvatarUrl: "https://cdn.jansora.com/img/author.jpg",
  SiteUrl:"https://www.jansora.com",
};
class Main extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      LoadStatus: true,
      Origin:"Github",
      OriginId: 28590000,
      id: Math.random().toString().slice(2,12),
      Comments: [],
      LoadText:"正在加载评论...",
      From: "",
      ReplyId: 0,
      ReplyTo: "",
      ReplyTime:"",
      Content:"",
      AvatarUrl: "https://cdn.jansora.com/img/author.jpg",
      SiteUrl:"",
      active: false,
    };

    this.Comments = [];
    this.CommitComment = this.CommitComment.bind(this)
  }
  
  componentDidMount() {
    this.setState({LoadStatus:false})
  }
  
  componentWillUnmount() {
  
  }
  renderComment(comments) {

    return comments.length !== 0 && <Comment.Group>
      {
        comments.map(comment => {
          return <Comment>
            <Comment.Avatar src={comment.AvatarUrl} />
            <Comment.Content className={this.state.ReplyId === comment.id ? "activeComment" : ""} >
              <Comment.Author as='a' href={comment.SiteUrl}>{comment.From}</Comment.Author>
              <Comment.Metadata>
                <div>{}{moment(comment.ReplyTime).fromNow()}</div>

              </Comment.Metadata>
              <Comment.Text>{comment.Content}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={() => this.setState({ReplyTo:comment.From, ReplyId: comment.id})}>回复</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
            {
              comment.children &&
                  this.renderComment(comment.children)
            }
          </Comment>

        })
      }
    </Comment.Group>

  }

  addComment = () => {
    const {dispatch, user} = this.props;
    let commit = {
      From: user.name,
      id: Math.random().toString().slice(2,12),
      ReplyId: this.state.ReplyId,
      ReplyTo:this.state.ReplyTo,
      ReplyTime: Date().toLocaleString(),
      Content: this.state.Content,
      AvatarUrl: user.avatar,
      SiteUrl:  user.url,
      children: [],
    }
    const {comment} = this.props.post;
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


    this.state.ReplyTo !== "" ?
    loop(comment, this.state.ReplyId, (item) => {
      item.children = item.children || [];
      item.children.unshift(commit);
    })
    : comment.unshift(commit);

    this.CommitComment(comment)
  }
  CommitComment = (comment) => {
    const {dispatch} = this.props;

    client.post("/Comment/Update/" + this.props.match.params.id, {
      Comment: comment.map(c => JSON.stringify(c))
    }).then(r => {
      if (r.data.ret) {
        dispatch(updatePost({comment: r.data.res.map(c => JSON.parse(c))}))
      }
    })
    
  }

  render() {

    const {active} = this.state;
    const {loginStatus, loginUrl, user} = this.props;
    const {comment} = this.props.post;
    return (
      <div id={"Comments"} className={"Comments"}>
        <Header as='h3' dividing>评论栏</Header>
        <Grid columns='equal' className="page-posts">
          <Grid.Column width={8}>

            <Comment.Group>
              <Comment>
                <Comment.Avatar src={initCommit.AvatarUrl} />
                <Comment.Content>
                  <Comment.Author as='a' href={initCommit.SiteUrl}>{initCommit.From} 说:</Comment.Author>
                  <Comment.Metadata>
                    <div>{moment(new Date()).fromNow()}</div>
                  </Comment.Metadata>
                  <Comment.Text>{initCommit.Content}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action onClick={() => this.setState({ReplyTo:"", ReplyId: 0})}>回复</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
            {this.renderComment(comment)}
            {/*<Comment.Group>*/}
            {/*  <Comment>*/}
            {/*    <Comment.Avatar src={initCommit.AvatarUrl} />*/}
            {/*    <Comment.Content>*/}
            {/*      <Comment.Author as='a' href={initCommit.SiteUrl}>{initCommit.From}</Comment.Author>*/}
            {/*      <Comment.Metadata>*/}
            {/*        <div>{initCommit.ReplyTime}</div>*/}
            {/*      </Comment.Metadata>*/}
            {/*      <Comment.Text>{initCommit.Content}</Comment.Text>*/}
            {/*      <Comment.Actions>*/}
            {/*        <Comment.Action onClick={(e, f) => console.log(e, f)}>回复</Comment.Action>*/}
            {/*      </Comment.Actions>*/}
            {/*    </Comment.Content>*/}
            {/*  </Comment>*/}
            {/*  {comment.map((comment, key) => (*/}
            {/*    <Comment key={key}>*/}
            {/*      <Comment.Avatar src={comment.AvatarUrl} />*/}
            {/*      <Comment.Content>*/}
            {/*        <Comment.Author as='a' target='_blank' rel="noopener noreferrer"  href={comment.SiteUrl}>{comment.From}</Comment.Author>*/}
            {/*        <Comment.Metadata>*/}
            {/*          <div>{moment(new Date(comment.ReplyTime)).fromNow()}</div>*/}
            {/*        </Comment.Metadata>*/}
            {/*        <Comment.Text>{comment.Content}</Comment.Text>*/}
            {/*        <Comment.Actions>*/}
            {/*          <Comment.Action onClick={() => this.setState({ReplyTo: comment.From})}>回复</Comment.Action>*/}
            {/*        </Comment.Actions>*/}
            {/*      </Comment.Content>*/}
            {/*    </Comment>*/}
            {/*  ))}*/}
            {/*</Comment.Group>*/}
          </Grid.Column>
  
          <Grid.Column width={8}>
            <Form reply id="reply">
              <Dimmer.Dimmable
                as={'div'}
                onMouseEnter={() => this.setState({active:true})}
                onMouseLeave={() => this.setState({active:false})}
              >
                <Dimmer active={active && !loginStatus} >
                  <Header as='h3' inverted>
                    你需要先登录才能评论
                  </Header>

                </Dimmer>

                <Form.Field width={16}>
                  <label>{this.state.ReplyTo != "" ? "回复" + this.state.ReplyTo: "评论内容."}</label>
                  <Form.TextArea
                    value={this.state.Content}
                    style={{minHeight:100}}
                    onChange={(_, e) => this.setState({Content: e.value})}
                  />
                  <Button onClick={this.addComment} content='添加 评论' labelPosition='left' icon='edit'  />
                </Form.Field>
              </Dimmer.Dimmable>
            </Form>
          </Grid.Column>
        </Grid>
      
      </div>
    );
  }
}
const mapStateToProps = state => ({
  post: state.post,
  user: state.app.user,
  state: state.app.state,
  loginStatus: state.app.loginStatus,
  loginUrl: state.app.loginUrl,
});
export default connect(
  mapStateToProps,
)(Main);

