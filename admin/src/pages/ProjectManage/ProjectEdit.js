import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {formatMessage} from 'umi/locale';
import {Button, Card, Col, DatePicker, Form, Icon, Input, message, Modal, Row, Select,} from 'antd';

import {PageHeaderWrapper} from '@ant-design/pro-layout';
import FooterToolbar from '@/components/FooterToolbar';
import styles from './style.less';


const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;


@connect(({Project, loading}) => ({
  Project,
  submitting: loading.effects['Article/EditSubmit'],
}))

@Form.create()
class ProjectEdit extends PureComponent {

  state = {
    judgeDeleteStatus: false,
  };

  componentDidMount() {
    const {dispatch} = this.props;
    const {url} = this.props.match.params;
    dispatch({
      type: 'Project/initProjectEdit',
      payload: {url},
    });
  }

  handleSubmit = e => {
    const {dispatch, form} = this.props;
    const {url} = this.props.match.params;
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
    const {dispatch} = this.props;
    dispatch({
      type: 'Project/deleteProject',
      payload: {url},
    });
  };

  render() {
    const {Project, form: {getFieldDecorator, getFieldValue}, submitting} = this.props;
    const {name, logoUrl, isPublic, url, description, frame} = Project.ProjectEdit;
    const { judgeDeleteStatus} = this.state;


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
                    rules: [{required: true, message: '请输入话题名称'}],
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
                    rules: [{required: true, message: '是否公开'}],
                  })(
                    <Select>
                      <Option value="true">公开</Option>
                      <Option value="false">不公开</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="logo">
                  {getFieldDecorator('logoUrl', {
                    initialValue: logoUrl,
                    rules: [{required: true, message: '请输入logo地址'}],
                  })(
                    <Input
                      style={{width: '100%'}}
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="url">
                  {getFieldDecorator('url', {
                    initialValue: url,
                    rules: [{required: true, message: '请输入logo地址'}],
                  })(
                    <Input
                      style={{width: '100%'}}
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
                    rules: [{required: true, message: '请输入frame地址'}],
                    initialValue: frame,
                  })(
                    <Input
                      style={{width: '100%'}}
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xl={24} lg={24} md={24} sm={24}>
                <FormItem label='摘要'>
                  {getFieldDecorator('description', {
                    initialValue: description,
                    rules: [
                      {
                        // required: true,
                        message: 'description',
                      },
                    ],
                  })(
                    <TextArea
                      style={{minHeight: 64, width: "100%"}}
                      placeholder={''}
                      rows={6}
                      cols={24}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <FooterToolbar>
          <div style={{width: '100vw', position: 'absolute', left: 0, padding: '10px 306px 0 50px'}}>
            <Input
              placeholder="请输入项目标题"
              // size="large"
              style={{ margin: '0 10px 10px 0', width: 300, float: 'left'}}
              suffix={
                judgeDeleteStatus ? (
                  <Icon
                    type="check-circle"
                    theme="filled"
                    style={{ color: '#1aad19', fontSize: '20px' }}
                  />
                ) : (
                  <Icon
                    type="close-circle"
                    theme="filled"
                    style={{ color: '#f5222d', fontSize: '20px' }}
                  />
                )
              }
              onChange={e =>
                this.setState({ judgeDeleteStatus: e.target.value.split(' ').join('') === name })
              }
            />
            <Button type="primary" style={{float: 'left'}}
                    onClick={() => this.deleteProject(url)}
                    disabled={!judgeDeleteStatus}
            >
              删除
            </Button>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{float: 'right'}}>
              提交
            </Button>
          </div>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default ProjectEdit;
