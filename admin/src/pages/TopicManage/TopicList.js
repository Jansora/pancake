import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Card, Form, Table} from 'antd';

import {PageHeaderWrapper} from '@ant-design/pro-layout';
import styles from './style.less';
import {Link} from 'react-router-dom';

@connect(({Topic, loading}) => ({
  Topic,
  initLoading: loading.effects['Topic/initTopicList'],
}))

@Form.create()
class TopicList extends PureComponent {

  state = {
    TopicListColumns: [
      {
        title: '标题',
        dataIndex: 'Name',
        key: 'Title',
        render: (name, obj) => <Link to={`/TopicManage/TopicEdit/${obj.Url}`}>{name}</Link>
      },
      {
        title: '公开',
        dataIndex: 'Is_public',
        key: 'public',
        render: pub => (pub ? '公开' : '私密'),
      }, {
        title: 'Logo',
        dataIndex: 'Logo_url',
        key: 'Logo_Url',
      }, {
        title: 'Url',
        dataIndex: 'Url',
        key: 'Url',
      },

    ],
  };

  componentDidMount() {
    const {dispatch} = this.props;
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
          <Table rowKey="Id" columns={TopicListColumns} dataSource={Topic.TopicList.tableData} loading={initLoading}/>
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default TopicList;
