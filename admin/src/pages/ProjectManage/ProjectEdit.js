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
  Tooltip, Row, Col, message,
} from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '@/components/FooterToolbar';
import styles from './style.less';

import {InitArticleInsertState, InitArticleEditState} from './data';
import { getLoginInfo } from '../../utils/authority';


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;



@connect(({ Project, loading }) => ({
  Project,
  submitting: loading.effects['Article/EditSubmit'],
}))

@Form.create()
class ProjectEdit extends PureComponent{
  
  state = {
  };

  componentDidMount(){
    const { dispatch } = this.props;
    const { url } = this.props.match.params;
    dispatch({
      type: 'Project/initProjectEdit',
      payload: {url},
    });
    
    //const simplemde = new SimpleMDE({ element: document.getElementById("content")});
    //this.setState({simplemde});
    // simplemde.codemirror.on('change', () => {
    //   this.setState({
    //     content:simplemde.value(),
    //   });
    // })
  }
  
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    const { url } = this.props.match.params;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      let d = {...values};
      if (!err) {
        d.isPublic = d.isPublic === "true";
        dispatch({
          type: 'Project/EditSubmit',
          payload: {
            ...d,
            oldUrl: url,
          },
        });
      }
    });
  };
  
  Insert = payload => {
    const {dispatch} = this.props;
    dispatch({
      type: 'Project/Insert',
      payload,
    });
  };
  
  deleteProject = (url) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'Project/deleteProject',
      payload: {url}
    });
  };
  
  render() {
    const { Project, form: { getFieldDecorator, getFieldValue }, submitting} = this.props;
    const {name, logoUrl, isPublic, url, description, frame} = Project.ProjectEdit;

    return (
      <PageHeaderWrapper
        title={'项目管理'}
        content={'项目编辑'}
      >
        <Card title="文章属性" className={styles.card}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col sm={5}>
                <Form.Item label="标题">
                  {getFieldDecorator('name', {
                    initialValue: name,
                    rules: [{ required: true, message: '请输入话题名称' }],
                  })(
                    <Input
                      placeholder="请输入话题名称"
                    />)}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="是否公开">
                  {getFieldDecorator('isPublic', {
                    initialValue: isPublic,
                    rules: [{ required: true, message: '是否公开' }],
                  })(
                    <Select>
                      <Option value="true">公开</Option>
                      <Option value="false">不公开</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col sm={5}  offset={1}>
                <Form.Item label="logo">
                  {getFieldDecorator('logoUrl', {
                    initialValue: logoUrl,
                    rules: [{ required: true, message: '请输入logo地址' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="url">
                  {getFieldDecorator('url', {
                    initialValue: url,
                    rules: [{ required: true, message: '请输入logo地址' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
    
              <Col sm={5}>
                <Form.Item label="frame地址">
                  {getFieldDecorator('frame', {
                    rules: [{ required: true, message: '请输入frame地址' }],
                    initialValue: frame,
                  })(
                    <Input
                      style={{ width: '100%' }}
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xl={24} lg={24} md={24} sm={24}>
                <FormItem label={<FormattedMessage id="form.goal.label" />}>
                  {getFieldDecorator('description', {
                    initialValue: description,
                    rules: [
                      {
                        // required: true,
                        message: "description",
                      },
                    ],
                  })(
                    <TextArea
                      style={{ minHeight: 64 , width:"100%"}}
                      placeholder={formatMessage({ id: 'form.goal.placeholder' })}
                      rows={6}
                      cols={24}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
  
        {/*<Button type="primary" htmlType="submit" block onClick={this.handleSubmit}>*/}
        {/*  <FormattedMessage id="form.submit" />*/}
        {/*</Button>*/}
        
        <FooterToolbar >
          <div style={{'width': '100vw', position: 'absolute', left:0, padding: '10px 306px 0 50px'}}>
            <Button type="primary" style={{float:'left'}}
                    onClick={() => message.warning('请双击来删除该文章')}
                    onDoubleClick={() => this.deleteProject(url)} >
              删除
            </Button>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{float:'right'}}  >
              <FormattedMessage id="form.submit" />
            </Button>
          </div>
  
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default ProjectEdit;
