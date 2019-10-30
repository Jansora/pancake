import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Card, Input, Table, Modal } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import Link from 'umi/link'

const { confirm } = Modal;
const TopicListComponent = props => {
  const { dispatch } = props;
  const [fetch, setFetch] = useState(true);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    dispatch({
      type: 'TopicList/init',
    });
  }, [fetch]);
  const { TopicList, loading } = props;
  const Topics = TopicList.Topics.filter(
    Topic => Topic.Name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

  const showDeleteConfirm = (record) => {

    confirm({
      title: `你确定要删除 ${record.Name} 吗`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'TopicEdit/delete',
          payload: { url: record.Url },
          callback: () => setFetch(!fetch),
        });
        // setFetch(true);
      },
      onCancel() {

      },
    });
  }

  const TopicListColumns = [
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
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      render: (_, record, index) =>
        <a href="#"
           onClick={e => {
             e.preventDefault();
             showDeleteConfirm(record)
           }}
        > 删除 </a>,
    },
  ]

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
