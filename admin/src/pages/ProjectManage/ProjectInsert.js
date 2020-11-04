import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import FooterToolbar from '@/components/FooterToolbar';


import 'highlight.js/styles/atom-one-light.css'


const FormItem = Form.Item;
const { Option } = Select;

const { TextArea } = Input;


const ProjectInsertComponent = props => {
  const { dispatch, match } = props;
  useEffect(() => {
    const { url } = match.params;
    dispatch({
      type: 'ProjectInsert/init',
      payload: { url },
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const { form } = props;
    form.validateFieldsAndScroll((err, values) => {
      let d = { ...values };
      if (!err) {
        d.isPublic = d.isPublic === 'true';
        dispatch({
          type: 'ProjectInsert/submit',
          payload: d,
        });
      }
    });
  };

  const { form: { getFieldDecorator } } = props;

  return (
    <PageHeaderWrapper
      title="插入项目"
    >
      <Card title="文章属性" >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col sm={5}>
              <Form.Item label="标题">
                {getFieldDecorator('name', {
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
                  initialValue: 'true',
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
                  // initialValue: logoUrl,
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
                  rules: [{required: true, message: '请输入frame地址'}],
                })(
                  <Input
                    style={{width: '100%'}}
                    placeholder="请输入"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xl={24} lg={24} md={24} sm={24}>
              <FormItem label="注解">
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
          <Button type="primary" htmlType="submit" onClick={handleSubmit} style={{ float: 'right' }}>
            提交
          </Button>
        </div>

      </FooterToolbar>
    </PageHeaderWrapper>
  );
};

export default connect(({ ProjectInsert, loading }) => ({
  ProjectInsert,
  loading: loading.effects['ProjectInsert/init'],
}))(Form.create({})(ProjectInsertComponent));
