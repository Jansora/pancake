/*
* @file setting.jsx
* @author jansora
* @date 2020/2/20
*/


import React, {useState} from "react";
import {UpdateTopic} from "../../../../request/topic";
import {Button, Form, Grid, GridColumn} from "semantic-ui-react";
import UploadImage from "../../../../components/upload/UploadImage";
import {Divider} from "antd";
import GetTheme from "../../../../components/hooks/GetTheme";


const Setting = (props) => {
    const {topic, setTopic, loading, setLoading} = props;

    const [title, setTitle] = useState(topic.title );
    const [description, setDescription] = useState( topic.description );
    const [url, setUrl] = useState(topic.url);
    const [logo, setLogo] = useState(topic.logo);
    const [permission, setPermission] = useState(topic.permission === 'PRIVATE');



    const update = () => {
        const data = {id: topic.id, title, description, url, logo,       permission : permission ? 'PRIVATE' : 'PUBLIC',}
        UpdateTopic(data, null, setTopic)
    }


    return (
        <Form style={{padding: "1rem", width: "500px"}} loading={loading}>
            <Grid columns="equal">
                <GridColumn width={11}>
                    <Form.Input
                        required
                        label='标题' placeholder='请输入专栏标题' type='text'
                        value={title} onChange={event => setTitle(event.target.value)}/>
                    <Form.Input label="url" placeholder="请输入url"
                                value={url} onChange={event => setUrl(event.target.value)}/>
                </GridColumn>
                <GridColumn>
                    <UploadImage
                        img={logo}
                        callback={setLogo} style={{ height: 107, marginTop: 19, marginLeft: 14, width: 114}}
                    />
                </GridColumn>
            </Grid>
            <Form.TextArea
                label="简介"
                style={{height: 84}}
                value={description} onChange={event => setDescription(event.target.value)}
                placeholder="请输入简介" />
            <Form.Field required style={{marginLeft: 8}}>
                <label>权限配置</label>
                {/*<Radio style={{marginTop: 8}} toggle checked={permission} onChange={(_, {checked}) => setPermission(checked)}/>*/}

                <Form.Checkbox style={{}}
                               toggle={false}
                               label="仅自己可见"
                               checked={permission}
                               onChange={(_, {checked}) =>
                                   setPermission(checked)}
                />
            </Form.Field>
            <Divider style={{margin: '20px 0 12px 0'}}/>


                    <Button
                        fluid
                        // style={{ height: 114, marginTop: 19, width: '100%'}}
                        color={GetTheme()} content='更新' onClick={() => update()}
                    />


        </Form>

    )
}

export default Setting;
