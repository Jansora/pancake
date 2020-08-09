/*
* @file index.jsx
* @author jansora
* @date 2020/2/13
*/


import React, {useState} from "react";
import GetUser from "../hooks/GetUser";
import {Button, Comment, Form, TextArea} from "semantic-ui-react";
import {AddComment, DeleteComment, QueryComments, UpdateComment} from "../../request/comment";
import GetTheme from "../hooks/GetTheme";
import UserAvatar from "../avatar/UserAvatar";

import 'moment/locale/zh-cn';
import * as moment from 'moment';

moment.locale("zh-CN");

const CommentBar = (props) => {
    const { ownerType } = props;
    const user = GetUser();
    const [id, setId] = useState(null)
    const [parentId, setParentId] = useState(props.parentId);
    const [replyTo, setReplyTo] = useState({});
    const [comments, _, fetch, setFetch] = QueryComments(props.parentId, ownerType);

    const [replyType, setReplyType] = useState('insert');

    const [raw, setRaw] = useState('');

    const placeholder = replyType === 'insert' ? '新增评论' :
        (replyType === 'replyTo' ? `回复给 ${replyTo ? replyTo.owner.alias : ''}` : '编辑评论')

    const reply = () => {
        if (replyType === 'insert') return AddComment({ownerType, raw, parentId}, callback)
        if (replyType === 'replyTo') return AddComment({ownerType, raw, parentId}, callback)
        if (replyType === 'update') return UpdateComment({id, raw}, callback)
    };

    const callback = () => {
        setFetch(true)
        setReplyType('insert')
        setReplyTo({})
        setParentId(props.parentId)
        setRaw('')
        setId(null)
    }

    const deleteComment = (id) => {
        DeleteComment({id}, setFetch);
    };

    const renderComments = comments => comments.filter(comment => comment.owner).map(
        comment => <Comment key={comment.id}>
            <UserAvatar popup={true} user={comment.owner} style={{display: 'block', float: 'left', margin: '3px 10px 0 0 '}}/>
            <Comment.Content style={{marginLeft: '3.5em'}}>
                <Comment.Author as='a'>{comment.owner.alias}</Comment.Author>
                <Comment.Metadata>
                    <div>{moment(comment.updateAt).fromNow()}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.raw}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action onClick={()=> {
                        setReplyTo(comment);
                        setParentId(comment.id)
                        setReplyType('replyTo')
                    }}>回复</Comment.Action>
                    {
                        user && user.id === comment.owner.id &&
                        <Comment.Action onClick={()=> {
                            setId(comment.id);
                            setRaw(comment.raw)
                            setReplyType('update')
                        }}>编辑</Comment.Action>
                    }
                    {
                        user && user.id === comment.owner.id &&
                        <Comment.Action onClick={()=> deleteComment(comment.id)
                        }>删除</Comment.Action>
                    }
                </Comment.Actions>
                {comment.children && renderComments(comment.children)}
            </Comment.Content>

        </Comment>
        )

    return (

        <Comment.Group id="Comments">
            {renderComments(comments)}

            <Form reply loading={fetch}>
                <TextArea
                    placeholder={placeholder}
                    value={raw} onChange={event => setRaw(event.target.value)} />
                <Button
                    onClick={()=>reply()} content={placeholder}
                    labelPosition='left' icon='edit' color={GetTheme()} />
            </Form>
        </Comment.Group>
    )
}

export default CommentBar;
