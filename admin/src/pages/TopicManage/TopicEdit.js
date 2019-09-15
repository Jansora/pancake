import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Tag, Tooltip, List, Icon} from 'antd';

import {PageHeaderWrapper} from '@ant-design/pro-layout';
import FooterToolbar from '@/components/FooterToolbar';
import styles from './style.less';


const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;


@connect(({Topic, loading}) => ({
  Topic,
  submitting: loading.effects['Article/EditSubmit'],
}))

@Form.create()
class TopicEdit extends PureComponent {

  state = {
    articles: [],
  };

  componentDidMount() {
    const {dispatch} = this.props;
    const {url} = this.props.match.params;
    dispatch({
      type: 'Topic/initTopicEdit',
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

  componentWillReceiveProps(nextProps, nextContext) {

    if(this.state.articles.length === 0 && nextProps.Topic.TopicEdit.articles){
      this.setState({ articles:  nextProps.Topic.TopicEdit.articles.map(e=>JSON.parse(e)) })
    }


  }

  handleSubmit = e => {
    const {dispatch, form} = this.props;
    const {url} = this.props.match.params;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      let d = {...values};
      if (!err) {
        d.isPublic = d.isPublic === 'true';
        d.articles = this.state.articles.map(e => JSON.stringify(e));

        dispatch({
          type: 'Topic/EditSubmit',
          payload: {
            ...d,
            oldUrl: url,
          },
        });
        // router.push(`/TopicEdit/${d.url}`)
        // routerRedux.push(`/TopicEdit/${d.url}`)

        // window.location.href = `/TopicManage/TopicEdit/${d.url}`;
        // routerRedux.replace(`/TopicEdit/${d.url}`);
      }
    });
  };

  Insert = payload => {
    const {dispatch} = this.props;
    dispatch({
      type: 'Topic/Insert',
      payload,
    });
  };

  deleteTopic = (url) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'Topic/deleteTopic',
      payload: {url},
    });
  };

  render() {
    const {Topic, form: {getFieldDecorator, getFieldValue}, submitting} = this.props;
    const {name, articles, logoUrl, isPublic, url, description} = Topic.TopicEdit;

    return (
      <PageHeaderWrapper
        title={'专栏编辑'}
      >
        <Card title="文章属性" className={styles.card}>
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

              <Col xl={24} lg={24} md={24} sm={24}>
                <Form.Item label=
                             {
                               <>
                               文章索引
                               <Tooltip title={'新增节点'}>
                                 <Icon
                                   style={{marginLeft: 20, fontSize: 20}}
                                   onClick={ () => {
                                     const cur1 = this.state.articles.slice(0);
                                     const cur2 = [{title: '默认节点', type: 'menu'}];
                                     const cur = cur1.concat(cur2);
                                     this.setState({
                                       articles: cur,
                                     })
                                   }}
                                   className={styles.direction} type="plus" />
                               </Tooltip>
                               </>
                             }

                >

                    <List
                      bordered
                      >
                      {
                    this.state.articles.map((article, index) => {
                        return <List.Item key={index}>
                          <Select
                            value={article.type}
                            style={{ width: 80, marginRight: 30 }}
                            optionFilterProp="children"
                            onChange={ type => {
                              this.setState({
                                articles: this.state.articles.map((e, i2) =>
                                  i2 === index ? {...e, type} : e
                                ),
                              })
                            }}
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Option value='menu'>菜单</Option>
                            <Option value='document'>文档</Option>
                          </Select>
                            {
                              article.type === 'menu' &&
                              <Input
                                value={this.state.articles[index].title}
                                style={{ width: 400 }}
                                onChange={ title => {
                                this.setState({
                                  articles: this.state.articles.map((e, i2) =>
                                    i2 === index ? { type: 'menu', title: title.target.value} : e
                                  ),
                                })
                              }}/>
                            }
                            {
                              article.type === 'document' &&
                              <Select
                                value={article.id}
                                showSearch
                                style={{ width: 400 }}
                                optionFilterProp="children"
                                onChange={ id => {
                                  this.setState({
                                    articles: this.state.articles.map((e, i2) => i2 === index ? {...e, id } : e),
                                  })
                                }}
                                filterOption={(input, option) =>
                                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                {
                                  Topic.TopicInsert.articles.map(e=> <Option key={e.Id} value={e.Id}>{e.Title}</Option>)
                                }
                              </Select>
                            }

                          <Tooltip title={index === 0 ? '已经到顶部了' : '向上移动'}>
                            <Icon
                              onClick={ () => {
                                if (index <= 0) return;
                                const cur1 = this.state.articles.slice(0, index-1);
                                const cur2 = this.state.articles.slice(index-1, index);
                                const cur3 = this.state.articles.slice(index, index+1);
                                const cur4 = this.state.articles.slice(index+1);
                                const cur = cur1.concat(cur3).concat(cur2).concat(cur4);
                                this.setState({
                                  articles: cur,
                                  })
                              }}
                              style={{cursor: index === 0 ? 'not-allowed' : 'pointer'}}
                              className={styles.direction}
                              type="arrow-up" />
                          </Tooltip>
                          <Tooltip title={index === this.state.articles.length - 1 ? '已经到底部了' : '向下移动'}>
                            <Icon
                              onClick={ () => {
                                if (index >= this.state.articles.length) return;
                                const cur1 = this.state.articles.slice(0, index);
                                const cur2 = this.state.articles.slice(index, index+1);
                                const cur3 = this.state.articles.slice(index+1, index+2);
                                const cur4 = this.state.articles.slice(index+2);
                                const cur = cur1.concat(cur3).concat(cur2).concat(cur4);
                                this.setState({
                                  articles: cur,
                                })
                              }}
                              style={{cursor: index === this.state.articles.length - 1 ? 'not-allowed' : 'pointer'}}
                              className={styles.direction} type="arrow-down" />
                          </Tooltip>
                          <Tooltip title={'在本节点前新增节点'}>
                            <Icon
                              style={{marginLeft: 200}}
                              onClick={ () => {
                                const cur1 = this.state.articles.slice(0, index);
                                const cur2 = [{title: '默认节点', type: 'menu'}];
                                const cur3 = this.state.articles.slice(index);
                                const cur = cur1.concat(cur2).concat(cur3);
                                this.setState({
                                  articles: cur,
                                })
                              }}
                              className={styles.direction} type="plus" />
                          </Tooltip>
                          <Tooltip title={'删除此节点'}>
                            <Icon
                              onClick={ () => {
                                const cur1 = this.state.articles.slice(0, index);
                                const cur2 = this.state.articles.slice(index+1);
                                const cur = cur1.concat(cur2);
                                this.setState({
                                  articles: cur,
                                })
                              }}
                              className={styles.direction} type="minus" />
                          </Tooltip>
                        </List.Item>
                        }

                      )
                      }
                    </List>

                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xl={24} lg={24} md={24} sm={24}>
                <FormItem label={'注解'}>
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

        <FooterToolbar>
          <div style={{'width': '100vw', position: 'absolute', left: 0, padding: '10px 306px 0 50px'}}>
            <Button type="primary" style={{float: 'left'}}
                    onClick={() => message.warning('请双击来删除该文章')}
                    onDoubleClick={() => this.deleteTopic(url)}>
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

export default TopicEdit;
