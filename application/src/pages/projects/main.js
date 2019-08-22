import React, {Component} from 'react';
//import { Input , Icon, Menu, Dropdown, Table,Card, Tag} from 'antd';
import moment from 'moment';
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

import {client} from './../../components/requests';

import {Card, Container, Reveal, Header, Image} from "semantic-ui-react";
import {getRandomColor} from "../../constants/color";

import {updateLoading} from "../../redux/actions/loading";

import './assets/topic.less'
import {setTitle} from "../../components/title";

moment.locale("zh-cn");

class Main extends Component {
  state = {
    data: [],
  };
  
  componentDidMount() {
    setTitle("项目列表");

  }

  componentWillMount() {
    this.getProjects({})
    
  }
  
  
  getProjects = (arg) => {
    
    const {dispatch} = this.props;
    const {tag, sort, offset, limit, sortType} = this.state;
    
    client.get("Project").then((e) => {
        if (e.data.ret) {
          //const tags = Array.from( new Set([].concat(...e.data.res.map(e => e.Tags))));
          //const tags = {}
          this.setState({data: e.data.res})
        }
        dispatch(updateLoading({
          loading: false,
        }))
      }
    ).catch(e => {
      console.log(e)
      dispatch(updateLoading({
        loading: false,
      }))
    })
  }
  
  render() {
    const {data} = this.state;
    return (
      <main>
        <Container className="page-topics" fluid>
          <Header as='h2'>话题列表</Header>
          <Card.Group itemsPerRow={3} >
            {
              data.map((e, index) =>

                  <Card
                    key={index}
                    color={getRandomColor()}
                    style={{background: `no-repeat center url(https://cdn.jansora.com/bg/background-16.jpg)`,backgroundSize: "100%"}}
                  >
                    <Card.Content>
                      {/*<Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />*/}
                      <Card.Header as={Link} to={`/project/${e.Url}`}>{e.Name}</Card.Header>
                      <Card.Meta><Link to={`/author`}>Jansora</Link></Card.Meta>
                      <Card.Description>
                        {e.Description}
                      </Card.Description>
                    </Card.Content>
                    {/*<Card.Content extra>*/}
                    {/*  此话题共有  <strong>{`${e.Articles.length}`}</strong> 篇文章*/}
                    
                    {/*</Card.Content>*/}
                  </Card>

                
              )
              
            }
          
          </Card.Group>
        
        </Container>
      </main>
    
    );
  }
}

const mapStateToProps = state => ({
  progress: state.progress,
});
export default connect(
  mapStateToProps,
)(Main);