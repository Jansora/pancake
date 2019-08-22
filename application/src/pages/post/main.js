import React, { Component } from 'react';

import connect from "react-redux/es/connect/connect";

import {client} from './../../components/requests';

import {
  Item,
  Container,
  Divider,
  Header,
  Label,
  Icon,
  Popup,
  Button,
  Grid,
  Image,
  Card,
  Loader
} from 'semantic-ui-react';

import {Anchor} from  'antd';

import  'antd/lib/anchor/style';

import {Comment} from '../comment/'



import "highlight.js/styles/atom-one-light.css"

import {setTitle} from "../../components/title";
import {updatePost} from "../../redux/actions/post";
import {updateLoading} from "../../redux/actions/loading";


import Editor from '../../components/editor'

import "./assets/post.less"
import "./assets/github-markdown.css"
// import "./assets/override.less"
class Main extends Component {
  
  
  editorRef = React.createRef();
  
  constructor(props) {
    super(props);
    
    this.state = {
      Author: "",
      Comment: [],
      Content: "",
      Create_time: "1970-01-01T00:00:00.000000Z",
      Id: 0,
      Is_public: true,
      Like_num: 0,
      Logo_url: "",
      Modify_time: "1970-01-01T00:00:00.000000Z",
      Read_num: 0,
      Site: "",
      Summary: "",
      Tags: [],
      Title: "",
      Toc: [],
      LoadStatus: true,
      LoadText: "正在加载文章......",
      Anchor: [],
      loading: false,
    }
  }
  
  componentDidMount() {

    const {dispatch, match} = this.props;
    this.setState({loading:true})
    client.get("/Article/" + match.params.url)
    .then(r => {
        if (r.data.ret) {
          const data = r.data.res;
          setTitle(data.Title);
          this.setState({...data});
         
          dispatch(updatePost({comment: data.Comment.map(c => JSON.parse(c))}))
          
          this.updateToc();
          this.setState({loading:false})
        }
      }
    ).catch(e => {
        console.log(e);
        this.setState({loading:false})
      }
    )
  }
  
  componentDidUpdate() {
  
  }
  
  componentWillUnmount() {
    clearInterval(this.IntervalID)
  }
  
  updateToc = () => {
    this.IntervalID = setInterval(() => {
      const article = document.querySelector("#post-body");
      if(null == article) return;
      const hs = article.querySelectorAll("h1,h2,h3,h4,h5,h6");
      const Anchor = [];

      if (hs.length !== 0) clearInterval(this.IntervalID)
      hs.forEach((item, index) => {
        const h = item.nodeName.substr(0, 2).toLowerCase()
        item.id = `Anchor-${h}-${index}`;
        Anchor.push({id: `Anchor-${h}-${index}`, text: item.textContent});
      })
      this.setState({Anchor})

    }, 100);
  }
  

  

  
  render() {
    const {Content, loading} = this.state;
    return (
      <div className="page-post"  >
        <Loader active={loading}/>
        <article>
          {/*<div className="header">*/}
            {/*<h1></h1>*/}
            {/*/!*<div>*!/*/}
              {/*/!*<span>作者：</span><Link to={"#"} >{this.state.Author}</Link>*!/*/}
              {/*/!*<div>*!/*/}
                {/*/!*<span>发表时间：</span><Link to={"#"} >{moment(this.state.Create_time, moment.ISO_8601).fromNow()}</Link>*!/*/}
                {/*/!*<span>最后修改时间：</span><Link to={"#"} >{moment(this.state.Modify_time, moment.ISO_8601).fromNow()}</Link>*!/*/}
                {/*/!*<span>创作地点：</span><Link to={"#"} >{this.state.Site}</Link>*!/*/}
              {/*/!*</div>*!/*/}
            {/*/!*</div>*!/*/}
          {/*</div>*/}

          <Container fluid textAlign='center'>
            <Header as='h1'> {this.state.Title}</Header>
          </Container>

          {/*<Divider  />*/}

          <div id={"post-body"}>

            <Editor
                value={Content}
                // EditorRef={editorRef => this.setState({editorRef})}
            />

          </div>
  
          {
            this.state.Id !== 0 && <Comment/>
          }
        </article>
        {
          this.state.Anchor.length > 0 &&
          <div>

           <Anchor onClick={(e,f) => e.preventDefault()} offsetTop={60} style={{marginLeft: 0}}>
             {
               this.state.Anchor.map((e, index) => {
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
          </div>
        }
      </div>
      
    );
  }
}
const mapStateToProps = state => ({

});
export default connect(
  mapStateToProps,
)(Main);