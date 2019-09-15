import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Button, Card, Col, DatePicker, Form, Input, message, Row, Select} from 'antd';

import {PageHeaderWrapper} from '@ant-design/pro-layout';
import FooterToolbar from '@/components/FooterToolbar';
import styles from './style.less';

import {InitArticleEditState} from './data';
import Editor from './PancakeEditor';
import 'highlight.js/styles/atom-one-light.css'

// import './override.css';
const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;


@connect(({Article, loading}) => ({
  Article,
  submitting: loading.effects['Article/EditSubmit'],
}))

@Form.create()
class ArticleEdit extends PureComponent {

  state = {
    ...InitArticleEditState,
    editorRef: React.createRef()
  };

  componentDidMount() {
    const {dispatch} = this.props;
    const {url} = this.props.match.params;
    dispatch({
      type: 'Article/initArticleEdit',
      payload: {url},
    });
  }

  componentWillUnmount() {
    const {editorRef} = this.state;
    console.log("aaa")
    this.setState({editorRef: null})

  }

  deleteArticle = (url) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'Article/deleteArticle',
      payload: {url}
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
        d.content = this.state.editorRef.getMdValue();

        dispatch({
          type: 'Article/EditSubmit',
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
      type: 'Article/Insert',
      payload,
    });
  };

  render() {
    const {Article, form: {getFieldDecorator,},} = this.props;
    const {title, site, author, summary, content, toc, tags, logoUrl, isPublic, url} = Article.ArticleEdit;

    const redux = Article.ArticleInsert;

    return (
      <PageHeaderWrapper
        title={'插入文章'}
        content={'插入你的文章'}
      >
        <Card title="文章属性" className={styles.card}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col sm={5}>
                <Form.Item label="标题">
                  {getFieldDecorator('title', {
                    initialValue: title,
                    rules: [{required: false, message: '请输入文章名称'}],
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
                    rules: [{required: false, message: '请输入author'}],
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
                    rules: [{required: false, message: '请输入发表地点'}],
                  })(
                    <Input
                      style={{width: '100%'}}
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="是否公开">
                  {getFieldDecorator('isPublic', {
                    initialValue: isPublic,
                    rules: [{required: false, message: '是否公开'}],
                  })(
                    <Select onChange={(isPublic) => this.Insert({isPublic})}>
                      <Option value="true">公开</Option>
                      <Option value="false">不公开</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

            </Row>
            <Row gutter={16}>
              <Col sm={5}>
                <Form.Item label="logoUrl">
                  {getFieldDecorator('logoUrl', {
                    initialValue: logoUrl,
                    rules: [{required: false, message: '请输入logo地址'}],
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
                    rules: [{required: false, message: '请输入logo地址'}],
                  })(
                    <Input
                      style={{width: '100%'}}
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 11, offset: 1}} lg={{span: 12}} md={24} sm={24}>
                <Form.Item label="tags">
                  {getFieldDecorator('tags', {
                    initialValue: tags,
                  })(
                    <Select
                      mode="tags"
                      style={{width: '100%'}}
                      placeholder="Tags Mode"
                    >
                      {redux.tags.map((tag, index) => <Option value={tag} key={index}>{tag}</Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card title="文章正文" className={styles.card}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col xl={24} lg={24} md={24} sm={24}>
                <FormItem label={'总结'}>
                  {getFieldDecorator('summary', {
                    initialValue: summary,
                    rules: [
                      {
                        // required: true,
                        message: "summary",
                      },
                    ],
                  })(
                    <TextArea
                      style={{minHeight: 64, width: "100%"}}
                      placeholder={'插入总结'}
                      rows={6}
                      cols={24}
                    />
                  )}
                </FormItem>
              </Col>

              <Col xl={24} lg={24} md={24} sm={24}>
                <FormItem label={'正文'}>
                  <Editor
                    value={content || ""}
                    EditorRef={editorRef => this.setState({editorRef})}
                  />
                </FormItem>
              </Col>

            </Row>
          </Form>
        </Card>
        <FooterToolbar>
          <div style={{'width': '100vw', position: 'absolute', left: 0, padding: '10px 306px 0 50px'}}>
            <Button type="primary" style={{float: 'left'}}
                    onClick={() => message.warning('请双击来删除该文章')}
                    onDoubleClick={() => this.deleteArticle(url)}>
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

export default ArticleEdit;
