/*
* @file UploadImage.jsx
* @author jansora
* @date 2020/2/19
*/


import React, {useEffect, useState} from "react";
import UploadFile from "./UploadFile";
import {Button, Form, Icon, Input, Modal, Radio} from "semantic-ui-react";
import styled from "styled-components";
import GetTheme from "../hooks/GetTheme";
import {StyledDescription} from "../../styled/GlobalStyles";

const Wrapper = styled(Button)`
    height: 114px ;
    display: block !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    ${props => props.background ? 'background-image: url('+props.background+')  !important;': ''}

`

const UploadImage = (props) => {
    const style = props.style ? props.style : {};

    const [open, setOpen] = useState(false);
    const { img } = props;


    const [selectType, setSelectType] = useState('本地上传');


    const [background, setBackground] = useState(img);
    useEffect(() => {
        setBackground(img)
    }, [img]);

    const callback = () => {
        props.callback && props.callback(background)
    }

    return (
        <React.Fragment>
            <Wrapper
                onClick={() => setOpen(true)}
                title={background ? '图片地址：' + background : '请上传图片'}
                style={style} color={GetTheme()} background={background}
            >
                {background ? '更换图片' : '选择图片'}
            </Wrapper>

            <Modal
                // size="fullscreen"
                open={open}
                // dimmer="inverted"
                onClose={() => setOpen(false)}
                style={{width: 650}}

            >
                <Modal.Header as={'h3'}>选择图片：<StyledDescription >{background}</StyledDescription></Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            选择方式: <b>{selectType}</b>
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='本地上传'
                                name='本地上传'
                                value='本地上传'
                                checked={selectType === '本地上传'}
                                onChange={(e, { value }) => setSelectType(value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='手动输入URL'
                                name='手动输入URL'
                                value='手动输入URL'
                                checked={selectType === '手动输入URL'}
                                onChange={(e, { value }) => setSelectType(value)}
                            />
                        </Form.Field>
                    </Form>
                    {
                        selectType === '本地上传' &&
                        <UploadFile callback={url => setBackground(url)} >
                            <Wrapper
                                title={background ? '图片地址：' + background : '请上传图片'}
                                style={style} color={GetTheme()} background={background}
                            >
                                {background ? '更换图片' : '上传图片'}
                            </Wrapper>
                        </UploadFile>
                    }
                    {
                        selectType === '手动输入URL' &&
                            <Input fluid value={background} onChange={event => setBackground(event.target.value)} />
                    }
                </Modal.Content>




                <Modal.Actions>
                    <Button icon onClick={() => setOpen(false)} >
                        取消
                    </Button>
                    <Button color={GetTheme()}  icon onClick={() => setOpen(false) || callback()} >
                        确定 <Icon name='right chevron' />
                    </Button>
                </Modal.Actions>
            </Modal>
        </React.Fragment>

    )
}

export default UploadImage;
