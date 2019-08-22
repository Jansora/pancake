import React, {Component} from 'react';
//import { Input , Icon, Menu, Dropdown, Table,Card, Tag} from 'antd';
import moment from 'moment';
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

import {client, format} from './../../components/requests';

import {Container, Item, Label, List, Transition, Header, Icon,Image, Grid, Statistic, Divider} from "semantic-ui-react";
import {getRandomColor} from "../../constants/color";

import Loading from "../../components/loader/common";

import {updateLoading} from "../../redux/actions/loading";

import './assets/topic.less'
import {setTitle} from "../../components/title";

moment.locale("zh-cn");

class Main extends Component {
  state = {
    data: {
      Articles:[],
      ArticleObjects:[],
    },
    fire: 0,
    tags: [],
  };
  
  componentDidMount() {
    setTitle("话题");
    window.addEventListener('scroll', this.scroll);
  }
  
  
  componentWillMount() {
    this.getTopic()
  }

  getTopic = () => {
    
    const {dispatch, match} = this.props;
    const {url} = match.params;
    const {tag, sort, offset, limit, sortType} = this.state;
    
    
    client.get(`Topic/${url}`).then((e) => {
        if (e.data.ret) {
          //const tags = Array.from( new Set([].concat(...e.data.res.map(e => e.Tags))));
          //const tags = {}
          let fire = e.data.res.ArticleObjects.map(f => f.Read_num).reduce((g, h) => g + h)
          e.data.res.ArticleObjects.sort((a,b) =>{
            const a_index = e.data.res.Articles.indexOf(a.Id.toString());
            const b_index = e.data.res.Articles.indexOf(b.Id.toString());
            if (a_index < b_index ) {
              return -1;
            }
            if (a_index > b_index ) {
              return 1;
            }
            // a must be equal to b
            return 0;
          })
          this.setState({data: e.data.res, fire,})
        }
      }
    ).catch(e => {
      console.log(e)
      dispatch(updateLoading({
        loading: false,
      }))
    })
  }
  
  render() {
    const {data, fire} = this.state;
    //const data =  this.state.data.concat(this.state.data).concat(this.state.data).concat(this.state.data).concat(this.state.data).concat(this.state.data)
    //const tags = Array.from( new Set([].concat(...data.map(e => e.Tags))));
    //console.log(tags)
    const articles = data.ArticleObjects;
    console.log(data)
    return (
      <React.Fragment>
        <Container className="page-topic" fluid>
          <Grid>
            <Grid.Row >
              <Grid.Column width={6} style={{marginRight:24}}>
                <Image size='big' src={data.Logo_url} />
              </Grid.Column>
              <Grid.Column width={9} >
                <Header as='h2'>
                  <Header.Content>{data.Name}</Header.Content>
                  <Header.Subheader style={{marginTop:24, height:60}} >{data.Description}</Header.Subheader>
                </Header>
                <Statistic.Group >
                  <Statistic color={getRandomColor()}>
                    <Statistic.Value>{data.Articles.length}</Statistic.Value>
                    <Statistic.Label>文摘</Statistic.Label>
                  </Statistic>
                  <Statistic color={getRandomColor()}>
                    <Statistic.Value>{fire}</Statistic.Value>
                    <Statistic.Label>热度</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Container fluid style={{marginTop: 108}}>
            <Header as='h2'>全部文摘</Header>
    
            <Transition.Group
              animation='fly left'
              as={List} duration={500} divided size='huge' verticalAlign='middle' style={{width:"100%"}}>
              {
                articles.map(a => (
                <List.Item key={a.Url} >
                  <Image size='small'  src={`${a.Logo_url}`} />
                  
                  <List.Content header={
                    <Header as='h3' ><Link to={`/p/${a.Url}`}> {a.Title}</Link></Header>
                    
                  } style={{marginLeft: 40}} />
                </List.Item>
              ))
              }
            </Transition.Group>
          </Container>
          
        </Container>
      </React.Fragment>
    
    );
  }
}

const mapStateToProps = state => ({
  // progress: state.progress,
});
export default connect(
  mapStateToProps,
)(Main);