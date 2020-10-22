/*
* @file addDocument.jsx
* @description〈一句话功能简述〉
* @author jansora

*/
import React, {useEffect, useRef, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {useHistory, useParams} from 'react-router-dom';

import {Button, Checkbox, Container, Dropdown, Form, Grid, Icon, Input, Loader} from "semantic-ui-react";

import DocEditor from "../editor/doc-editor";

import GetTheme from "../hooks/GetTheme";
import {AddPost, AutoSavePost, QueryLogos, QueryPost, QueryTags, UpdatePost} from "../../request/post";

import {StyledDescription} from "../../styled/GlobalStyles";

import History from "./History";
import UploadFileComponent from "../upload/UploadFile";
import SetTitle from "../hooks/SetTitle";

import styled from "styled-components";

const StyledDropdown = styled(Dropdown)`
  :hover {
    z-index: 1001 !important;
  }
  div.ui.active.visible.dropdown {
  
  }

`
const EditPost = (props) => {


  // editable 为 true 为编辑模式, 否则为新建模式

  const history = useHistory();
  const { resource, topic } = useParams();

  const editable = !!resource;

  const theme = GetTheme();

  const [post, setPost, loading, setLoading] = QueryPost(resource);

  const editorRef = useRef(null);

  const [autoSaveDate, setAutoSaveDate] = useState(null);


  const [title, setTitle] = useState(editable ? post.title : '');
  const [description, setDescription] = useState(editable ? post.description : '');
  const [url, setUrl] = useState(editable ? post.url : '');
  const [logo, setLogo] = useState(editable ? post.logo : '');
  const [tags, setTags] = useState(editable ? post.tags : ["所有"]);
  const [raw, setRaw] = useState(editable ? post.raw : '');
  const [permission, setPermission] = useState(editable ? post.permission === 'PRIVATE' : false);
  const [openHistory, setOpenHistory] = useState(false);
  const [tagsList, setTagList] = QueryTags();
  const [logos, setLogos] = QueryLogos();


  SetTitle(editable ? title : "新建博客")

  useEffect(() => {
    if( post.id) {
      setTitle(post.title)
      setDescription(post.description)
      setUrl(post.url)
      setLogo(post.logo)
      setTags((editable && post.tags) ? post.tags : ["所有"])
      setRaw(post.raw)
      setPermission(editable ? post.permission === 'PRIVATE' : false)
    }

  }, [post])


  const add = () => {
    const args = {
      permission : permission ? 'PRIVATE' : 'PUBLIC',
      title, description, url, tags, logo, raw: editorRef.current.getMdValue()
    };
    AddPost(args, (url)=>history.push(`/post/${url}`));
  };

  const update = () => {
    const args = { id: post.id,
      permission : permission ? 'PRIVATE' : 'PUBLIC',
      title, description, url, tags, logo, raw: editorRef.current.getMdValue()
    };
    const go = () => topic ? history.push(`/topic/${topic}/${url}`) : history.push(`/post/${url}`)
    UpdatePost(args, go)
  };



  const autoSave = ({html, text}) => {
    if(!editable) return;
    const args = { id: post.id, version: "AUTO_CREATED", raw: text};
    AutoSavePost(args, null, null, () => setAutoSaveDate(new Date().toLocaleString()))
  }

  const [autoSaveDebounce] = useDebouncedCallback(autoSave, 3000);


  if (loading) return <Loader content='Loading' active={loading} />;

  return (
      <React.Fragment>
      <Container fluid style={{padding:16}}>
        <StyledDescription style={{position: 'absolute', right: 0}}>{autoSaveDate && '自动保存：' + autoSaveDate} </StyledDescription>

            <Form style={{marginBottom: 20}}>
              <Grid >
                <Grid.Column width={3}>
                  <Form.Field required>
                    <label>标题</label><Input placeholder="请输入标题"
                                            value={title} onChange={event => setTitle(event.target.value)}/>
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Form.Field required>
                    <label>url</label><Input placeholder="请输入url"
                                             value={url} onChange={event => setUrl(event.target.value)}/>
                  </Form.Field>
                </Grid.Column>


                <Grid.Column width={3}>
                  <Form.Field required>
                    <label>简介</label>
                    <Input
                      value={description} onChange={event => setDescription(event.target.value)}
                      placeholder="请输入简介" />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Form.Field required>
                    <label>分类</label>
                    <StyledDropdown
                      onAddItem={(e, { value }) => {
                        // setTags(tags.concat([value]));
                        if(tagsList.filter(tag => tag[0] === value).length === 0) {
                          setTagList(tagsList.concat([[value, 1]]))
                        }
                        // options.push({key: value, text: value, value})
                      }}
                      onChange={(e, { value }) => setTags(value)}
                      options={tagsList.map(tag => {return {key: tag[0], text: tag[0], value: tag[0]}})}
                      placeholder='选择分类'
                      search
                      selection
                      multiple
                      allowAdditions
                      additionLabel={<StyledDescription>自定义标签</StyledDescription>}
                      value={tags}
                      renderLabel={(label) => ({color: theme, content: label.text,})}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Form.Field required>
                    <label>引导图片</label>
                    <StyledDropdown
                      onAddItem={(e, { value }) => {
                        if(logos.filter(l => l.logo === value).length === 0) {
                          setLogos(logos.concat([{logo: value, title: value, source: 'new'}]))
                        }
                      }}
                      onChange={(e, { value }) => console.log(value) ||setLogo(value)}
                      options={logos.map((l, index) => {return {key: index, text: `${l.source} ${l.title}` ,
                           value: l.logo}})}
                      placeholder='选择Logo'
                      search
                      selection
                      allowAdditions
                      additionLabel={<StyledDescription>自定义标签</StyledDescription>}
                      value={logo}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={1}>
                  <div style={{ height: 38, width: '100%', display: "inline-block", marginTop: "28px"}}>
                  <UploadFileComponent
                    callback={setLogo}
                  >
                    <Icon name='upload' color={theme} circular link />
                  </UploadFileComponent>
                  </div>
                </Grid.Column>

              </Grid>
            </Form>


        <DocEditor value={raw}
                   onChange={autoSaveDebounce} EditorRef={editorRef} style={{minHeight: 600}}
        />





      </Container>
        <Container fluid style={{
          position: 'fixed', bottom: 0, padding: 8,
          background: "white", display: "flex", justifyContent: "flex-end",
          boxShadow: "0 0 8px 0 rgba(0,0,0,.1)",
        }}
        >
          <div style={{lineHeight: "36px", marginRight: '20px'}}>
            <Checkbox style={{}}
                      label="仅自己可见"
                      checked={permission} onChange={(_, {checked}) => setPermission(checked)}/>

          </div>
          {
            editable && <Button
              color={theme} content='历史版本' onClick={() => {
              setOpenHistory(true)
              setRaw(editorRef.current.getMdValue())
            }}
            />
          }
          <Button
            style={{margin: "0 22px"}}
            color={theme}
            content={editable ? '更新文档' :'创建文档'}
            onClick={() => editable ? update(): add()}
          />

        </Container>
        {editable && post &&
        <History raw={raw} post={post} open={openHistory} setOpen={setOpenHistory}/>}
      </React.Fragment>
  )
}
export default EditPost;
