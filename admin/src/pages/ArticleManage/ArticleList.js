import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Card, Input, Table } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import Link from 'umi/link'

const ArticleListColumns = [
  {
    title: '标题',
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
    render: pub => (pub ? '公开' : '私密'),
  },

  {
    title: '地址',
    dataIndex: 'Site',
    key: 'Site',
  },
  {
    title: 'Url',
    dataIndex: 'Url',
    key: 'Url',
  },
  {
    title: 'Logo',
    dataIndex: 'Logo_url',
    key: 'LOGO',
  },
]
const ArticleListComponent = props => {

  const [filter, setFilter] = useState('');
  useEffect(() => {
    const { dispatch } = props;
    dispatch({
      type: 'ArticleList/init',
    });
  }, []);
  const { ArticleList, loading } = props;
  const Articles = ArticleList.Articles.filter(
    article => article.Title.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

  return (
    <PageHeaderWrapper>
      <Card title={
        <>
          博客列表
          <Input style={{ width: 250, marginLeft: 25 }} placeholder="输入标题过滤"
                 onChange={e => setFilter(e.target.value)}
          />
        </>
      } style={{ marginBottom: 24 }}>
        <Table
          rowKey="Id"
          pagination={{ pageSize: 10 }}
          columns={ArticleListColumns} dataSource={Articles} loading={loading}/>
      </Card>

    </PageHeaderWrapper>
  );
};


export default connect(({ ArticleList, loading }) => ({
  ArticleList,
  loading: loading.effects['ArticleList/init'],
}))(ArticleListComponent);
