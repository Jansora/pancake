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
  Tooltip, Row, Col,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FooterToolbar from '@/components/FooterToolbar';
import styles from './style.less';

import "highlight.js/styles/atom-one-light.css"

// import {Editor, Viewer} from '../Editor'

import {InitArticleInsertState} from './data';

import Editor from "./PancakeEditor"
import MdEditor from "react-markdown-editor-lite";


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;



@connect(({ Article }) => ({
  Article,
  
  
}))

@Form.create()
class ArticleInsert extends PureComponent{


  state = {
    ...InitArticleInsertState,
    editorRef:React.createRef()

  };
  
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'Article/initArticleInsert',
    });
    
  }
  
  handleSubmit = e => {
    const { dispatch, form, Editor } = this.props;
    const {editorRef, content} = this.state;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      let d = {...values};
      if (!err) {
        d.isPublic = d.isPublic === "true";
        d.content = editorRef.getMdValue();
        // d.html = editorRef.current.editorInst.getHtml();
        dispatch({
          type: 'Article/InsertSubmit',
          payload: d,
        });
        // console.log(this.state.editorRef.getMdValue())
      }
    });
  };
  
  render() {
    const { Article, form: { getFieldDecorator, getFieldValue }, } = this.props;
    const {title, site, author, summary, content, toc, tags, logoUrl, isPublic, url, editorRef} = this.state;
    const redux = Article.ArticleInsert;
    // if(editorRef.current && content){
    //   editorRef.current.editorInst.setMarkdown(content, false);
    // }
    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.basic.title" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card title="文章属性" className={styles.card}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col sm={5}>
                <Form.Item label="标题">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入文章名称' }],
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
                      placeholder="请输入"
                    />
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
                    </Select>
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
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="url">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: '请输入logo地址' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 11, offset: 1 }} lg={{span: 12 }} md={24} sm={24}>
                <Form.Item label="tags">
                  {getFieldDecorator('tags', {
                  })(
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Tags Mode"
                    >
                      {redux.tags.map(tag => <Option value={tag} key={tag}>{tag}</Option>)}
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
                <FormItem label={<FormattedMessage id="form.goal.label" />}>
                  {getFieldDecorator('summary', {
                    rules: [
                      {
                        // required: true,
                        message: "summary",
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
              
              <Col xl={24} lg={24} md={24} sm={24}>
                <FormItem label={'正文'}>
                  <Editor
                      // value={content}
                      EditorRef={editorRef => this.setState({editorRef})}
                  />


                </FormItem>
              </Col>
              
            </Row>
          </Form>
        </Card>
        <FooterToolbar>
          <Button type="primary" htmlType="submit" block onClick={this.handleSubmit}>
            <FormattedMessage id="form.submit" />
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
      
    );
  }
}

export default ArticleInsert;