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

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';
import marked from 'marked';

import { Link } from 'react-router-dom';

var renderer = new marked.Renderer();
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;




@connect(({ Project, loading }) => ({
  Project,
  initLoading: loading.effects['Project/initProjectList'],
}))

@Form.create()
class ProjectList extends PureComponent{
  
  state = {
    ProjectListColumns:[
      {
        title: '标题',
        dataIndex: 'Name',
        key: 'Title',
        render: (name, obj) =>
          <React.Fragment>
            <Link to={`/ProjectManage/ProjectEdit/${obj.Url}`}>{name}</Link>
            {/*<a style={{marginLeft:25}} onClick={()=> message.info('请双击删除')} onDoubleClick={() => this.deleteProject(Url)}>刪除</a>*/}
    
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
        //     <Link to={`/ProjectManage/ProjectEdit/${Url}`}>编辑</Link>
        //     <a style={{marginLeft:25}} onClick={()=> message.info('请双击删除')} onDoubleClick={() => this.deleteProject(Url)}>刪除</a>
        //
        //   </React.Fragment>
      },
      {
        title: 'Frame',
        dataIndex: 'Frame',
        key: 'Frame',
        // render: Url =>
        //   <React.Fragment>
        //     <Link to={`/ProjectManage/ProjectEdit/${Url}`}>编辑</Link>
        //     <a style={{marginLeft:25}} onClick={()=> message.info('请双击删除')} onDoubleClick={() => this.deleteProject(Url)}>刪除</a>
        //
        //   </React.Fragment>
      },
    ]
  };

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'Project/initProjectList',
    });
  }
  


  render() {
    const {Project, initLoading} = this.props;
    const {ProjectListColumns} = this.state;
    return (
      <PageHeaderWrapper>
        <Card title="项目列表" className={styles.card}>
          <Table      rowKey={'Id'} columns={ProjectListColumns} dataSource={Project.ProjectList.tableData} loading={initLoading}/>
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default ProjectList;
