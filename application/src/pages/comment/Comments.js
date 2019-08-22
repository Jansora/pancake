



import conf from "./../../common.less.js";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";


class Comments extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      LoadStatus: true,
      Comments: [],
      LoadText:"正在加载评论...",
      From: "",
      ReplyTo:"",
      ReplyTime:"",
      Content:"",
      AvatarUrl: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
      SiteUrl:"",
    };
    this.initCommit = {
      From: "Jans Zg",
      ReplyTo:"你",
      ReplyTime:"Now",
      Content:"如有疑问，请在下方留言",
      AvatarUrl: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
      SiteUrl:"https://www.jans.xin",
    };
    this.Comments = [];
    this.CommitComment = this.CommitComment.bind(this)
  }
  
  componentDidMount() {
    //console.log(this.props);
    //setInterval(() => console.log(this.props), 2000)
    this.setState({LoadStatus:false})
  }
  
  componentWillUnmount() {
  
  }
  componentWillReceiveProps(nextProps, nextContext) {
    console.log(" xxsafas",nextProps, nextContext)
    if (nextProps.data.length !== this.state.Comments.length) {
      
      this.setState({Comments:nextProps.data.map(c => JSON.parse(c))})
    }
  }
  CommitComment = () => {
    
    let commit = {
      From: this.state.From,
      ReplyTo:this.state.ReplyTo,
      ReplyTime: Date().toLocaleString(),
      Content: this.state.Content,
      AvatarUrl: this.state.AvatarUrl,
      SiteUrl:  this.state.SiteUrl.startsWith("http") ? this.state.SiteUrl : "http://" + this.state.SiteUrl,
    }
    r.post("/Comment/Update/" + this.props.match.params.Article, {
      Comment: JSON.stringify(commit)
    }).then(r => {
      if (r.data.ret) {
        this.setState({Comments:r.data.res.map(c => JSON.parse(c))})
      }
    })
    
  }
  render() {
    
    return (
      <div id={"Comments"} className={"Comments"}>
        
        <Loader activeStatus={this.state.LoadStatus} activeText={this.state.LoadText}/>
        <Comment.Group>
          <Header as='h3' dividing>
            评论栏
          </Header>
          <Comment>
            <Comment.Avatar src={this.initCommit.AvatarUrl} />
            <Comment.Content>
              <Comment.Author as='a' href={this.initCommit.SiteUrl}>{this.initCommit.From}</Comment.Author>
              <Comment.Metadata>
                <div>{this.initCommit.ReplyTime}</div>
              </Comment.Metadata>
              <Comment.Text>{this.initCommit.Content}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={(e, f) => console.log(e, f)}>回复</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
          {this.state.Comments.map((comment, key) => (
            <Comment key={key}>
              <Comment.Avatar src={comment.AvatarUrl} />
              <Comment.Content>
                <Comment.Author as='a' href={comment.SiteUrl}>{comment.From}</Comment.Author>
                <Comment.Metadata>
                  <div>{comment.ReplyTime}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.Content}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action onClick={() => this.setState({ReplyTo: comment.From})}>回复</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}

          

          

          {/*<Comment>*/}
            {/*<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />*/}
            {/*<Comment.Content>*/}
              {/*<Comment.Author as='a'>Elliot Fu</Comment.Author>*/}
              {/*<Comment.Metadata>*/}
                {/*<div>Yesterday at 12:30AM</div>*/}
              {/*</Comment.Metadata>*/}
              {/*<Comment.Text>*/}
                {/*<p>This has been very useful for my research. Thanks as well!</p>*/}
              {/*</Comment.Text>*/}
              {/*<Comment.Actions>*/}
                {/*<Comment.Action>Reply</Comment.Action>*/}
              {/*</Comment.Actions>*/}
            {/*</Comment.Content>*/}
            {/*<Comment.Group>*/}
              {/*<Comment>*/}
                {/*<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />*/}
                {/*<Comment.Content>*/}
                  {/*<Comment.Author as='a'>Jenny Hess</Comment.Author>*/}
                  {/*<Comment.Metadata>*/}
                    {/*<div>Just now</div>*/}
                  {/*</Comment.Metadata>*/}
                  {/*<Comment.Text>Elliot you are always so right :)</Comment.Text>*/}
                  {/*<Comment.Actions>*/}
                    {/*<Comment.Action>Reply</Comment.Action>*/}
                  {/*</Comment.Actions>*/}
                {/*</Comment.Content>*/}
              {/*</Comment>*/}
            {/*</Comment.Group>*/}
          {/*</Comment>*/}
          
          {/*<Comment>*/}
            {/*<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />*/}
            {/*<Comment.Content>*/}
              {/*<Comment.Author as='a'>Joe Henderson</Comment.Author>*/}
              {/*<Comment.Metadata>*/}
                {/*<div>5 days ago</div>*/}
              {/*</Comment.Metadata>*/}
              {/*<Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>*/}
              {/*<Comment.Actions>*/}
                {/*<Comment.Action>Reply</Comment.Action>*/}
              {/*</Comment.Actions>*/}
            {/*</Comment.Content>*/}
          {/*</Comment>*/}
          <Divider/>
          <Form reply>
            <Form.Group>
              <Form.Field width={8}>
                <label>昵称</label>
                <input
                  value={this.state.From}
                  onChange={(e) => this.setState({From: e.target.value} )}
                />
              </Form.Field>
              <Form.Field width={8}>
                <label>个人域名</label>
                <input
                  value={this.state.SiteUrl}
                  onChange={(e) => this.setState({SiteUrl: e.target.value} )}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field width={16}>
              <label>评论内容，已支持Markdown渲染.</label>
              <Form.TextArea
                value={this.state.Content}
                onChange={(_, e) => this.setState({Content: e.value})}
              />
              <Button onClick={this.CommitComment} content='添加 评论' labelPosition='left' icon='edit' color="violet" />
            </Form.Field>
          </Form>
        </Comment.Group>
      
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.user,
  state: state.app.state,
  loginStatus: state.app.loginStatus,
  loginUrl: state.app.loginUrl,
});
export default withRouter(connect(
  mapStateToProps,
)(Comments));





