import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip, Row, Col,Table,
  Divider,
  message,
} from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';
import marked from 'marked';

import { Link } from 'react-router-dom';

var renderer = new marked.Renderer();
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;




@connect(({ Article, Editor, loading }) => ({
  Article,
  Editor,
  initLoading: loading.effects['Article/initArticleList'],
}))

@Form.create()
class ArticleList extends PureComponent{
  
  state = {
    ArticleListColumns:[
      {
        title: '标题' ,
        dataIndex: 'Title',
        key: 'Title',
        render: (Title, obj) =>
            <Link to={`/ArticleManage/ArticleEdit/${obj.Url}`}>{Title}</Link>
      },
      {
        title: '作者',
        dataIndex: 'Author',
        key: 'Author',
      },
      
      {
        title: '公开',
        dataIndex: 'Is_public',
        key: 'public',
        render: pub  => pub ? "公开" : "私密",
      }, {
        title: '地址',
        dataIndex: 'Site',
        key: 'Site',
      }, {
        title: 'Logo',
        dataIndex: 'Logo_url',
        key: 'LOGO',
      }
    ],
    Articles:[]
  };
  
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'Article/initArticleList',
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.filterValue("")
  }


  deleteArticle = (url) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'Article/deleteArticle',
      payload: {url}
    });
  }

  filterValue = (value) => {
    const {Article, initLoading} =  this.props;

    this.setState({Articles: Article.ArticleList.filter(e=> e.Title.toLowerCase().indexOf(value.toLowerCase())!==-1)})

  }


  render() {
    const {Article, initLoading} = this.props;
    const {ArticleListColumns, Articles} = this.state;
    return (
      <PageHeaderWrapper>
        <Card title={<>博客列表 <Input style={{width:250, marginLeft:25}} placeholder={"过滤"} onChange={e => this.filterValue(e.target.value)}/></>} className={styles.card}>
          <Table
              rowKey={'Id'}
              // title={() => <Input style={{width:250}} placeholder={"过滤"} onChange={e => this.filterValue(e.target.value)}/>}
              columns={ArticleListColumns} dataSource={Articles} loading={initLoading} />
        </Card>
      
      </PageHeaderWrapper>
    );
  }
}

export default ArticleList;
