import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { Button, Card, Col, Form, Input, Row, Select, Icon } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import FooterToolbar from '@/components/FooterToolbar';


import 'highlight.js/styles/atom-one-light.css'


import Editor from './PancakeEditor'

const FormItem = Form.Item;
const {Option} = Select;

const {TextArea} = Input;


const ArticleEditComponent = props => {

  const editorRef = useRef(null);
  const [judgeDeleteStatus, setJudgeDeleteStatus] = useState(false);

  useEffect(() => {
    const { dispatch, match } = props;
    const { url } = match.params;
    dispatch({
      type: 'ArticleEdit/init',
      payload: { url },
    });
  }, []);
  useEffect(() => {
    document.title = `${props.ArticleEdit.data.title} - 博客管理 - Pancake后台管理`
  }, [props.ArticleEdit.data.title]);

  const handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form, match } = props;
    const { url } = match.params;
    form.validateFieldsAndScroll((err, values) => {
      const d = { ...values };
      if (!err) {
        d.isPublic = d.isPublic === 'true';
        d.content = editorRef.current.getMdValue();
        dispatch({
          type: 'ArticleEdit/submit',
          payload: {
            ...d,
            oldUrl: url,
          },
        });

      }
    });
  };

  const deleteArticle = url => {
    const { dispatch } = props;
    dispatch({
      type: 'ArticleEdit/delete',
      payload: { url },
    });
  }
  const { ArticleEdit, form: { getFieldDecorator } } = props;
  const { title, site, author, summary, content, tags, logoUrl, isPublic, url } = ArticleEdit.data;

  return (
    <PageHeaderWrapper
      title="编辑文章"
    >
      <Card title="文章属性" style={{ marginBottom: 24 }}>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col sm={5}>
              <Form.Item label="标题">
                {getFieldDecorator('title', {
                  initialValue: title,
                  rules: [{required: true, message: '请输入文章名称'}],
                })(
                  <Input
                    placeholder="请输入文章名称"
                  />)}
              </Form.Item>
            </Col>
            <Col sm={5} offset={1}>
              <Form.Item label="Author">
                {getFieldDecorator('author', {
                  initialValue: author,
                  rules: [{ required: true, message: '请输入author' }],
                })(
                  <Input
                    placeholder="请输入author"
                    disabled
                  />)}
              </Form.Item>
            </Col>
            <Col sm={5} offset={1}>
              <Form.Item label="发表地点">
                {getFieldDecorator('site', {
                  initialValue: site,
                  rules: [{ required: true, message: '请输入发表地点' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    placeholder="请输入发表地点"
                  />,
                )}
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

          </Row>
          <Row gutter={16}>
            <Col sm={5}>
              <Form.Item label="logo">
                {getFieldDecorator('logoUrl', {
                  initialValue: logoUrl,
                  rules: [{ required: true, message: '请输入logo地址' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    placeholder="请输入logo地址"
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
                    placeholder="请输入url地址"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 11, offset: 1 }} lg={{ span: 12 }} md={24} sm={24}>
              <Form.Item label="tags">
                {getFieldDecorator('tags', {
                  initialValue: tags,
                })(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="标签列表，如果需要在应用页面被检索到，请至少选择 '所有' 标签"
                  >
                    {ArticleEdit.tags.map(tag => <Option value={tag} key={tag}>{tag}</Option>)}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24}>
              <FormItem label="总结">
                {getFieldDecorator('summary', {
                  initialValue: summary,
                  rules: [
                    {
                      // required: true,
                      message: 'summary',
                    },
                  ],
                })(
                  <TextArea
                    style={{ minHeight: 64, width: '100%' }}
                    placeholder="总结"
                    rows={6}
                    cols={24}
                  />,
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card title="文章正文">
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col xl={24} lg={24} md={24} sm={24}>
              <FormItem label="">
                <Editor
                  value={content}
                  EditorRef={editorRef}
                />
              </FormItem>
            </Col>

          </Row>
        </Form>
      </Card>
      <FooterToolbar>
        <div style={{ width: '100vw', position: 'absolute', left: 0, padding: '10px 306px 0 50px' }}>
          <Input
            placeholder="请输入文章标题"
            style={{ margin: '0 10px 10px 0', width: 300, float: 'left' }}
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
             setJudgeDeleteStatus(e.target.value === title)
            }
          />
          <Button type="primary" style={{float: 'left'}}
                  disabled={!judgeDeleteStatus}
                  onClick={() => deleteArticle(url)}
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

}


export default connect(({ArticleEdit, loading, user}) => ({
  ArticleEdit,
  currentUser: user.currentUser,
  loading: loading.effects['ArticleEdit/init'],
}))(Form.create({ })(ArticleEditComponent));

