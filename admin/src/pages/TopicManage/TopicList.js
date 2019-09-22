import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Card, Input, Table } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import Link from 'umi/link'

const TopicListColumns =[
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
  },
  {
    title: 'Logo',
    dataIndex: 'Logo_url',
    key: 'Logo_Url',
  },
  {
    title: 'Url',
    dataIndex: 'Url',
    key: 'Url',
  },

]
const TopicListComponent = props => {

  const [filter, setFilter] = useState('');
  useEffect(() => {
    const { dispatch } = props;
    dispatch({
      type: 'TopicList/init',
    });
  }, []);
  const { TopicList, loading } = props;
  const Topics = TopicList.Topics.filter(
    Topic => Topic.Name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

  return (
    <PageHeaderWrapper title="">
      <Card title={
        <>
          专栏列表
        <Input style={{ width: 250, marginLeft: 25 }} placeholder="输入标题过滤"
               onChange={e => setFilter(e.target.value)}
        />
        </>
      } style={{ marginBottom: 24 }}>
        <Table rowKey="Id"
               pagination={{ pageSize: 1000000 }}
               columns={TopicListColumns} dataSource={Topics} loading={loading}/>
      </Card>

    </PageHeaderWrapper>
  );
};


export default connect(({TopicList, loading}) => ({
  TopicList,
  loading: loading.effects['TopicList/init'],
}))(TopicListComponent);
