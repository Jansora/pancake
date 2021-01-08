import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Dimmer, Dropdown, Form, Grid, Input, Loader, Select, TextArea} from "semantic-ui-react";
import {useHistory, useParams} from 'react-router-dom';

import {Head, Section} from "../../components/styled/frameworks";
import {Editor} from "../../components/editor/bytemd";
import {
  FetchClassifies,
  FetchLogos,
  FetchNote,
  FetchTags,
  InsertNote,
  UpdateNote
} from "../../components/request/notebook";
import styled from 'styled-components'
import GetTheme from "../../components/hooks/GetTheme";
import {StyledDescription} from "../../components/styled/common";
import {useDebounceFn, useTitle} from "ahooks";
import {message} from "antd";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/05 16:26:57
 */
const StyledDropdown = styled(Dropdown)`
  :hover {
    //z-index: 1001 !important;
  }
  div.ui.active.visible.dropdown {
  
  }

`
const ModifyNote = (props) => {


  const history = useHistory();
  const {id} = useParams();
  const theme = GetTheme()
  const [note, noteLoading] = FetchNote(id)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState( '');
  const [logo, setLogo] = useState( '');
  const [tag, setTag] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const [classify, setClassify] = useState(1);

  const [raw, setRaw] = useState('');
  const [rawInit, setRawInit] = useState(!id);
  const [logos, setLogos, logosLoading] = FetchLogos();
  const [tags, setTags, tagsLoading] = FetchTags();
  const [classifies, classifiesLoading] = FetchClassifies();


  useEffect(() => {
    if(!!id) {
      setTitle(note.title);
      setDescription(note.description);
      setLogo(note.logo);
      setTag(!!note.tag ? note.tag.split(",") : []);
      setEnabled(note.enabled);
      setClassify(note.classify);
      setRaw(!!note.raw ? note.raw : '');
      setRawInit(true)
      setClassify(note.classify);
    }


  },[id, note])


  const save = () => {
    const args = {
      enabled, classify, id,
      title, description, tag: `${!!tag ? tag.join(",") : ''}`, logo, raw
    };
    const callback = (data) => history.push(`/notes/${data.id}`);
    if(!id) {
      InsertNote(args, callback);
    } else {
      UpdateNote(args, callback);
    }
  }
  const autoSaveFn = () => {
    const args = {
      enabled, classify, id, version: 'AUTO_CREATED',
      title, description, tag: `${!!tag ? tag.join(",") : ''}`, logo, raw
    };
    const callback = message.success("自动保存成功");
    if(!!id) {
      UpdateNote(args, callback);
    }
  }
  const { run } = useDebounceFn(
      autoSaveFn,
      {
        wait: 8000,
      },
  );

  useTitle(!id ? "新建笔记" : `更新笔记 - ${title}`)

  if(id && noteLoading) {
    return   <Dimmer active={noteLoading} inverted>
      <Loader active inline='centered' />
    </Dimmer>
  }


  return <React.Fragment>

    <Head marginLeft={false}>
      <h3>{!id? "新建笔记" : `更新笔记 - ${title}`}</h3>
      <div style={{flex:"1 1 auto"}}>
      </div>
        <Checkbox style={{}}
                  label={"启用此笔记"}
                  checked={enabled} onChange={(_, {checked}) => setEnabled(checked)}/>
        <Button
            style={{margin: "0 22px"}}
            content={!id ? '新建笔记' : "更新笔记"}
            color={theme}
            size="tiny"
            onClick={() => save()}
        />

    </Head>
    <Section marginLeft={false} marginRight={false}>

        <Form style={{padding: 16}}>
          <Grid >
            <Grid.Column width={3}>
              <Form.Field
                  control={Input}
                  label='标题'
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                  placeholder='请输入标题'
              />
            </Grid.Column>
            <Grid.Column width={3}>

            <Form.Field
              loading={classifiesLoading}
              control={Select}
              label='分类'
              value={classify}
              onChange={(event, {value}) => console.log(value) || setClassify(value)}
              options={classifies.map(classify_ => ({key: classify_.id, text: classify_.name, value: classify_.id}))}
              placeholder='请选择分类'
          />
            </Grid.Column>
            <Grid.Column width={5}>

            <Form.Field required>
            <label>画像</label>
            <StyledDropdown
                loading={tagsLoading}
                onAddItem={(e, { value }) => {
                  // setTags(tags.concat([value]));
                  if(tags.filter(tag => tag[0] === value).length === 0) {
                    setTags(tags.concat([[value, 1]]))
                  }
                  // options.push({key: value, text: value, value})
                }}
                onChange={(e, { value }) => setTag(value)  }
                options={tags.map(tag_ => {return {key: tag_[0], text: tag_[0], value: tag_[0]}})}
                placeholder='添加画像'
                search
                selection
                multiple
                allowAdditions
                additionLabel={<StyledDescription>自定义标签</StyledDescription>}
                value={tag}
                renderLabel={(label) => ({ content: label.text,})}
            />
          </Form.Field>
            </Grid.Column>
            <Grid.Column width={5}>

            <Form.Field required>
            <label>引导图片</label>
            <StyledDropdown
                loading={logosLoading}
                onAddItem={(e, { value }) => {
                  if(logos.filter(l => l.logo === value).length === 0) {
                    setLogos(logos.concat([{logo: value, title: value}]))
                  }
                }}
                onChange={(e, { value }) => console.log(value) ||setLogo(value)}
                options={logos.map((l, index) => {return {key: index, text: `${l.title}` ,
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
          </Grid>
          <Form.Field
              control={TextArea}
              label='简介'
              placeholder='请输入简介'
              value={description} onChange={event => setDescription(event.target.value)}
          />


          {/*</Grid>*/}


    <Form.Field>
      <label>正文</label>
      {/*隐藏 bug, raw 值初始化后不能被修改 */}

      {
        rawInit &&

        <Editor
            value={raw}
            setValue={(v) => {setRaw(v); run()}}
        />
      }
    </Form.Field>


        </Form>

    </Section>

  </React.Fragment>;
}

export default ModifyNote;
