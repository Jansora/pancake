import React, { Component } from 'react';
import { message} from 'antd';
import moment from 'moment';
import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";

import {client, format} from './../../components/requests';

import {Grid, Segment, Card, Icon, Image, Label, Item, Header, List, Loader, Container, Transition, Message} from "semantic-ui-react";
import {colorArray, getRandomColor} from "../../constants/color";


// import Loading from "../../components/loader/common";

import {updateLoading} from "../../redux/actions/loading";

import './assets/posts.less'

import {updateApp} from "../../redux/actions/app";
import {setTitle} from "../../components/title";

moment.locale("zh-cn");

const TOTAL = 0;
const LIMIT = 10;
const OFFSET = 0;
const DATA = [];
class Main extends Component {
  state = {
    data: [],
    sort: 'desc',
    sortType: 'create_time',
    tags: {},
    tag: [],
    total: 0,
    limit: 10,
    offset: 0,
    time: 0,
    loading: false,
  };
  
  componentDidMount() {
    setTitle("博文列表");
    window.addEventListener('scroll', this.scroll);
  }
  scroll = () => {
    const {progress} = this.props;
    const {sort, tags, tag, total, data} = this.state;
    // console.log(progress.progressBar > 90, total, data.length, total > data.length)
    if (progress.progressBar > 90 && total > data.length){
      this.getArticles({message:true})
    }
  };
  
  componentWillMount() {
    this.getArticles({})
    this.getTags()
  }

  updateSort = (sort) => {
    if (sort !== this.state.sort){

      this.getArticles({sort, data:DATA, total: TOTAL, limit: LIMIT, offset: OFFSET})
    }
  };
  updateSortType = (sortType) => {
    
    if (sortType !== this.state.sortType){
      this.getArticles({sortType, data:DATA, total: TOTAL, limit: LIMIT, offset: OFFSET})
    }
  };
  
  updateTag = (tag) => {
    if(!tag){
      this.getArticles({tag:[], data:DATA, total: TOTAL, limit: LIMIT, offset: OFFSET})
      return
    }
    const curTag = this.state.tag.indexOf(tag) >= 0 ? this.state.tag.filter(e => e !== tag) : this.state.tag.concat([tag]);
    this.getArticles({tag:curTag, data:DATA, total: TOTAL, limit: LIMIT, offset: OFFSET})

  };
  
  getTags = () => {
    this.setState({loading:true})
    client.get("Tags").then((e)=>{
        if(e.data.ret){
          const tags = {}
          e.data.res.forEach(item => {
            item.forEach(tag => {
              if(tags.hasOwnProperty(tag)){
                tags[tag] += 1
              } else {
                tags[tag] = 1
              }
            })
          })
          let sortable = [];
          for (let tag in tags) {
            sortable.push([tag, tags[tag]]);
          }
          sortable.sort(function(a, b) {
            return b[1] - a[1];
          });
          const result = {};
          sortable.forEach((item) => result[item[0]] = item[1]);
          console.log(result)
          this.setState({tags:result})
          this.setState({loading:false})
        }
      }
    ).catch( e => {
      this.setState({loading:false})
    })
  }
  getArticles = (arg) => {
    const {tag, sort, offset, limit, sortType, data, total} = this.state;
    
    const args = {};
    // if(sort !== ''){
    //   args.sort = sort;
    // }
    //
    // if(sortType !== ''){
    //   args.sortType = sortType;
    // }
    if(arg.sort !== undefined&&  arg.sort !== ''){
      this.setState({sort:arg.sort})
      args.sort = arg.sort;
    } else {
      args.sort = sort;
    }
    if(arg.sortType !== undefined && arg.sortType !== '' ){
      this.setState({sortType:arg.sortType})
      args.sortType = arg.sortType;
    } else {
      args.sortType = sortType;
    }
    if(arg.tag !== undefined){
      this.setState({tag:arg.tag})
      args.tag = arg.tag;
    } else {
      args.tag = tag;
    }
    // if(arg.total !== undefined){
    //   this.setState({total:arg.total})
    //   args.total = arg.total;
    // } else {
    //   args.total = total;
    // }
    if(arg.offset !== undefined){
      this.setState({offset:arg.offset})
      args.offset = arg.offset;
    } else {
      args.offset = offset;
    }
    if(arg.limit !== undefined){
      this.setState({limit:arg.limit})
      args.limit = arg.limit;
    } else {
      args.limit = limit;
    }
    this.setState({loading:true});
    const start = new Date();
    client.get("Article?" + format(args)).then((e)=>{
      const end = new Date();
      if(e.data.ret){
        const cur_data = arg.data !== undefined ? arg.data.concat(e.data.res) : data.concat(e.data.res)
          this.setState({
            data: cur_data, total: e.data.total,
            offset: args.limit + args.offset})
        };
        this.setState({loading:false, time: end-start})
      }
    ).catch( e => {
      console.error(e);
      const end = new Date();
      this.setState({loading:false, time: end-start})
    })
  }
  render() {
    const {data, loading, total, time} = this.state;
    const {sort, tags, tag, sortType} = this.state;
    //const data =  this.state.data.concat(this.state.data).concat(this.state.data).concat(this.state.data).concat(this.state.data).concat(this.state.data)
    //const tags = Array.from( new Set([].concat(...data.map(e => e.Tags))));
    //console.log(tags)
    return (
      <React.Fragment>
        <Container className="page-posts" fluid>
          <Loader active={loading}/>
          <div className="page-posts-options">
            {/*<span>文章标签</span>*/}
            <span>资料标签</span>
            <List bulleted horizontal link className={'page-posts-options-item'}>
              <List.Item as='a' className={tag.length === 0 ? 'active-color' : null} onClick={()=>this.updateTag()}>默认</List.Item>
              {
                Object.keys(tags).map(e => <List.Item as='a' key={e} className={tag.indexOf(e) >= 0 ? 'active-color' : null} onClick={()=>this.updateTag(e)}>{e}({tags[e]})</List.Item>)
              }
            </List>
          </div>
          <div className="page-posts-options">
            <span>排序属性</span>
            <List bulleted horizontal link className={'page-posts-options-item'}>
              {/*<List.Item as='a' className={sortType === '' ? 'active-color' : null} onClick={()=>this.updateSortType('')}>默认</List.Item>*/}
              <List.Item as='a' className={sortType === 'create_time' ? 'active-color' : null} onClick={()=>this.updateSortType('create_time')}>发表时间</List.Item>
              <List.Item as='a' className={sortType === 'modify_time' ? 'active-color' : null} onClick={()=>this.updateSortType('modify_time')}>更新时间</List.Item>
  
              <List.Item as='a' className={sortType === 'title' ? 'active-color' : null} onClick={()=>this.updateSortType('title')}>标题</List.Item>
             
              <List.Item as='a' className={sortType === 'like_num' ? 'active-color' : null} onClick={()=>this.updateSortType('like_num')}>点赞数</List.Item>
              <List.Item as='a' className={sortType === 'read_num' ? 'active-color' : null} onClick={()=>this.updateSortType('read_num')}>访问量</List.Item>
            </List>
          </div>
          <div className="page-posts-options">
            <span>排序方式</span>
            <List bulleted horizontal link className={'page-posts-options-item'}>
              {/*<List.Item as='a' className={sort === '' ? 'active-color' : null} onClick={()=>this.updateSort('')}>默认</List.Item>*/}
              <List.Item as='a' className={sort === 'desc' ? 'active-color' : null} onClick={()=>this.updateSort('desc')}>倒序</List.Item>
              <List.Item as='a' className={sort === 'asc' ? 'active-color' : null} onClick={()=>this.updateSort('asc')}>正序</List.Item>
            </List>
          </div>
          {/*<List selection >*/}
          <Message icon >
            <Icon name='circle notched' loading={loading} />
            <Message.Content>
              <Message.Header>
                {
                  loading ? '请稍等, 正在查找...' :
                    <>
                      共查询到<span className='message-number'>{total}</span>条结果, 耗时
                      <span className='message-number'>{time}</span> ms.
                    </>
                }
              </Message.Header>
              {
                loading ? '' :
                  <>
                    默认只展示前<span className='message-number'>10</span>条结果, 页面下滑到
                    <span className='message-number'>90%</span>时会自动加载下
                    <span className='message-number'>10</span>条数据
                  </>
              }
            </Message.Content>
          </Message>
          <Transition.Group as={Item} duration={1200} >
            <Item.Group >
              {
                data.map((e, index) =>{
      
                  return <Item key={index} className={'page-posts-item'}>
                      <Item.Image src={e.Logo_url} as={Link} to={"/p/" + e.Url} />
    
                      <Item.Content>
                        <Item.Header as={Link} to={"/p/" + e.Url}>{e.Title}</Item.Header>
                        <Item.Meta>
                          <a target='_blank' rel="noopener noreferrer" href={"https://www.jansora.com"}> {e.Author}</a>
                        </Item.Meta>
                        <Item.Description>{e.Summary}</Item.Description>
                        <Item.Extra>
                          {e.Tags.map((tag, key) => (
                            <Label  as={'a'} color={getRandomColor()} key={key} onClick={()=>this.updateTag(tag)}>
                              {tag}
                            </Label>
                          ))}
                        </Item.Extra>
                      </Item.Content>
                    
                    </Item>
            
                  })
              }
            </Item.Group>
          </Transition.Group>
          {
            !loading && data.length >= 5 && data.length >= total &&
            <Message icon >
              <Icon name='rss' />
              <Message.Content>
                <Message.Header>
                  没有更多内容了
                </Message.Header>

              </Message.Content>
            </Message>
          }

        </Container>
      </React.Fragment>

    );
  }
}
const mapStateToProps = state => ({
  progress: state.progress,
});
export default connect(
  mapStateToProps,
)(Main);