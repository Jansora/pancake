import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Button, Card, Col, Form, Input, Row, Select, Icon } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import FooterToolbar from '@/components/FooterToolbar';


import 'highlight.js/styles/atom-one-light.css'


const FormItem = Form.Item;
const { Option } = Select;

const { TextArea } = Input;


const ProjectEditComponent = props => {
  const [judgeDeleteStatus, setJudgeDeleteStatus] = useState(false);

  const { dispatch, match } = props;
  useEffect(() => {
    const { url } = match.params;
    dispatch({
      type: 'ProjectEdit/init',
      payload: { url },
    });
  }, []);
  useEffect(() => {
    document.title = `${props.ProjectEdit.name} - 项目管理 - Pancake后台管理`
  }, [props.ProjectEdit.name]);
  const handleSubmit = e => {
    e.preventDefault();
    const { form } = props;
    const { url } = match.params;
    form.validateFieldsAndScroll((err, values) => {
      let d = { ...values };
      if (!err) {
        d.isPublic = d.isPublic === 'true';
        dispatch({
          type: 'ProjectEdit/submit',
          payload: {
            ...d,
            oldUrl: url,
          },
        });
      }
    });
  };

  const deleteProject = url => {
    dispatch({
      type: 'ProjectEdit/delete',
      payload: { url },
    });
  };

  const { ProjectEdit, form: { getFieldDecorator } } = props;
  const { name, logoUrl, isPublic, url, frame } = ProjectEdit;
  return (
    <PageHeaderWrapper
      title="编辑项目"

    >
      <Card title="文章属性" >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col sm={5}>
              <Form.Item label="标题">
                {getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{ required: true, message: '请输入项目名称' }],
                })(
                  <Input
                    placeholder="请输入项目名称"
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
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col sm={5} offset={1}>
              <Form.Item label="logo">
                {getFieldDecorator('logoUrl', {
                  initialValue: logoUrl,
                  rules: [{ required: true, message: '请输入logo地址' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    placeholder="请输入"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col sm={5} offset={1}>
              <Form.Item label="url">
                {getFieldDecorator('url', {
                  initialValue: url,
                  rules: [{ required: true, message: '请输入url地址' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    placeholder="请输入"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>

            <Col sm={5}>
              <Form.Item label="frame地址">
                {getFieldDecorator('frame', {
                  initialValue: frame,
                  rules: [{ required: true, message: '请输入frame地址' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    placeholder="请输入"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xl={24} lg={24} md={24} sm={24}>
              <FormItem label={'description'}>
                {getFieldDecorator('description', {
                  rules: [
                    {
                      message: '注解',
                    },
                  ],
                })(
                  <TextArea
                    style={{ minHeight: 64, width: '100%' }}
                    rows={6}
                    cols={24}
                  />,
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>

      <FooterToolbar>
        <div style={{ width: '100vw', position: 'absolute', left: 0, padding: '10px 306px 0 50px' }}>
          <Input
            placeholder="请输入专栏名称"
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
              setJudgeDeleteStatus(e.target.value === name)
            }
          />
          <Button type="primary" style={{ float: 'left' }}
                  disabled={!judgeDeleteStatus}
                  onClick={() => deleteProject(url)}
          >
            删除
          </Button>
          <Button type="primary" htmlType="submit" onClick={handleSubmit} style={{ float: 'right' }}>
            提交
          </Button>
        </div>

      </FooterToolbar>
    </PageHeaderWrapper>
  );
};

export default connect(({ ProjectEdit, loading }) => ({
  ProjectEdit,
  loading: loading.effects['ProjectEdit/init'],
}))(Form.create({ })(ProjectEditComponent));
