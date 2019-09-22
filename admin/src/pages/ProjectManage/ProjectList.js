import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Card, Input, Table } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import Link from 'umi/link'

const ProjectListColumns = [
  {
    title: '标题',
    dataIndex: 'Name',
    key: 'Title',
    render: (name, obj) => <Link to={`/ProjectManage/ProjectEdit/${obj.Url}`}>{name}</Link>,
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
    title: 'Frame',
    dataIndex: 'Frame',
    key: 'Frame',
  },
];
const ProjectListComponent = props => {

  const [filter, setFilter] = useState('');
  useEffect(() => {
    const { dispatch } = props;
    dispatch({
      type: 'ProjectList/init',
    });
  }, []);
  const { ProjectList, loading } = props;
  const Projects = ProjectList.Projects.filter(
    Project => Project.Name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

  return (
    <PageHeaderWrapper title="">
      <Card title={
        <>
          项目列表
          <Input style={{ width: 250, marginLeft: 25 }} placeholder="输入标题过滤"
                 onChange={e => setFilter(e.target.value)}
          />
        </>
      } style={{ marginBottom: 24 }}>
        <Table rowKey="Id"
               pagination={{ pageSize: 1000000 }}
               columns={ProjectListColumns} dataSource={Projects} loading={loading}/>
      </Card>

    </PageHeaderWrapper>
  );
};


export default connect(({ProjectList, loading}) => ({
  ProjectList,
  loading: loading.effects['ProjectList/init'],
}))(ProjectListComponent);
