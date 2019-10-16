import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'dva';
import { Button, Card, Col, Form, Input, Row, Select, Icon, Tooltip , List} from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import FooterToolbar from '@/components/FooterToolbar';

import styles from './style.less'

import 'highlight.js/styles/atom-one-light.css'

import update from 'immutability-helper'

import DragItem from './DragItems';

const FormItem = Form.Item;
const { Option } = Select;

const { TextArea } = Input;

import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'


const TopicEditComponent = props => {
  const [articles, setArticles] = useState([]);
  const [judgeDeleteStatus, setJudgeDeleteStatus] = useState(false);

  const { dispatch, match } = props;
  useEffect(() => {
    const { url } = match.params;
    dispatch({
      type: 'TopicEdit/init',
      payload: { url },
    });
  }, []);
  useEffect(() => {
    document.title = `${props.TopicEdit.data.name} - 专栏管理 - Pancake后台管理`
  }, [props.TopicEdit.data.name]);
  useEffect(() => {
    setArticles(props.TopicEdit.data.articles)
  }, [props.TopicEdit.data.articles]);

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragArticle = articles[dragIndex]
      setArticles(
        update(articles, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragArticle]],
        }),
      )
    },
    [articles],
  )


  const handleSubmit = e => {
    e.preventDefault();
    const { form } = props;
    const { url } = props.match.params;
    form.validateFieldsAndScroll((err, values) => {
      const d = { ...values };
      if (!err) {
        d.isPublic = d.isPublic === 'true';
        d.articles = articles.map(JSON.stringify);

        dispatch({
          type: 'TopicEdit/submit',
          payload: {
            ...d,
            oldUrl: url,
          },
        });
      }
    });
  };

  const deleteTopic = url => {
    dispatch({
      type: 'TopicEdit/delete',
      payload: { url },
    });
  }
  const { TopicEdit, form: { getFieldDecorator } } = props;
  // const { articles } = TopicEdit;
  const { name, logoUrl, isPublic, url, description } = TopicEdit.data;

  return (
    <PageHeaderWrapper
      title="专栏编辑"
    >

      <Card title="文章属性" >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col sm={5}>
              <Form.Item label="标题">
                {getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{required: true, message: '请输入项目名称'}],
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

            <Col xl={24} lg={24} md={24} sm={24}>
              <Form.Item label=
                           {
                             <>
                               文章索引
                               <Tooltip title={'新增节点'}>
                                 <Icon
                                   style={{marginLeft: 20, fontSize: 20}}
                                   onClick={ () => {
                                     const cur1 = articles.slice(0);
                                     const cur2 = [{ title: '默认节点', type: 'menu' }];
                                     const cur = cur1.concat(cur2);
                                     setArticles(cur)
                                   }}
                                   className={styles.direction} type="plus" />
                               </Tooltip>
                             </>
                           }

              >

                <List
                  bordered
                >
                  <DndProvider backend={HTML5Backend}>
                    <div>
                      {
                        articles.map((article, index) => <DragItem
                            moveItem={moveItem}
                            setArticles={setArticles}
                            index={index}
                            article={article}
                            articles={articles}
                            collections={TopicEdit.articles}
                          />,
                        )
                      }
                    </div>
                  </DndProvider>
                </List>

              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xl={24} lg={24} md={24} sm={24}>
              <FormItem label="注解">
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
                    style={{minHeight: 64, width: '100%'}}
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
          <Button type="primary" style={{float: 'left'}}
                  disabled={!judgeDeleteStatus}
                  onClick={() => deleteTopic(url)}
          >
            删除
          </Button>
          <Button type="primary" htmlType="submit" onClick={handleSubmit} style={{float: 'right' }}>
            提交
          </Button>
        </div>

      </FooterToolbar>
    </PageHeaderWrapper>
  );

}


export default connect(({TopicEdit, loading, user}) => ({
  TopicEdit,
  currentUser: user.currentUser,
  loading: loading.effects['TopicEdit/init'],
}))(Form.create({ })(TopicEditComponent));

