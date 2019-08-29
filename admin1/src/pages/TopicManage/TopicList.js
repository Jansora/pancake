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
  Tooltip, Row, Col, Table, message
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import marked from 'marked';

import { Link } from 'react-router-dom';

var renderer = new marked.Renderer();
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;




@connect(({ Topic, loading }) => ({
  Topic,
  initLoading: loading.effects['Topic/initTopicList'],
}))

@Form.create()
class TopicList extends PureComponent{
  
  state = {
    TopicListColumns:[
      {
        title: '标题',
        dataIndex: 'Name',
        key: 'Title',
        render: (name, obj) =>
          <React.Fragment>
            <Link to={`/TopicManage/TopicEdit/${obj.Url}`}>{name}</Link>
            {/*<a style={{marginLeft:25}} onClick={()=> message.info('请双击删除')} onDoubleClick={() => this.deleteTopic(Url)}>刪除</a>*/}
    
          </React.Fragment>
      },
      {
        title: '公开',
        dataIndex: 'Is_public',
        key: 'public',
        render: pub  => pub ? "公开" : "私密",
      }, {
        title: 'Logo',
        dataIndex: 'Logo_url',
        key: 'Logo_Url',
      }, {
        title: 'Url',
        dataIndex: 'Url',
        key: 'Url',
        // render: Url =>
        //   <React.Fragment>
        //     <Link to={`/TopicManage/TopicEdit/${Url}`}>编辑</Link>
        //     <a style={{marginLeft:25}} onClick={()=> message.info('请双击删除')} onDoubleClick={() => this.deleteTopic(Url)}>刪除</a>
        //
        //   </React.Fragment>
      },
  
    ]
  };

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'Topic/initTopicList',
    });
  }
  


  render() {
    const {Topic, initLoading} = this.props;
    const {TopicListColumns} = this.state;
    return (
      <PageHeaderWrapper>
        <Card title="话题列表" className={styles.card}>
          <Table columns={TopicListColumns} dataSource={Topic.TopicList.tableData} loading={initLoading}/>
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default TopicList;
