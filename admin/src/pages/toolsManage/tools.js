import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Button, Card, Col, Form, Input, Row,} from 'antd';

import {PageHeaderWrapper} from '@ant-design/pro-layout';

import styles from './style.less';


@connect(({Tools}) => ({
  Tools,

}))

@Form.create()
class Tools extends PureComponent {

  state = {};

  componentDidMount() {

  }

  handleSubmit = e => {
    const {dispatch, form,} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      let d = {...values};
      if (!err) {
        dispatch({
          type: 'Tools/addfile',
          payload: d,
        });
      }
    });
  };

  render() {
    const {form: {getFieldDecorator, getFieldValue}, Tools} = this.props;
    return (
      <PageHeaderWrapper
        title={'常用工具'}
        content={'便捷高调的工具'}
      >
        <Card title="上传文件" className={styles.card}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col sm={5}>
                <Form.Item label="文件url">
                  {getFieldDecorator('url', {
                    rules: [{required: true, message: '文件url'}],
                    initialValue: "https://img-bbs.csdn.net/upload/201408/15/1408090192_90442.jpg"
                  })(
                    <Input
                      placeholder="请输入话题名称"
                    />)}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="文件名称">
                  {getFieldDecorator('filename', {
                    rules: [{required: true, message: '文件url'}],
                    initialValue: 'test',
                  })(
                    <Input
                      placeholder="请输入话题名称"
                    />)}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="提交">
                  <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                    提交
                  </Button>
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="最近一次上次文件的url">
                  <span></span>
                  <a target='_blank' href={Tools.uploadurl} rel="noopener noreferrer">{Tools.uploadurl}</a>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

      </PageHeaderWrapper>

    );
  }
}

export default Tools;
