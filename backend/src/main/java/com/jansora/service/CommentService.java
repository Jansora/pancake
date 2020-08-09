package com.jansora.service;

import com.jansora.dao.CommentDao;
import com.jansora.dao.UserDao;
import com.jansora.dto.CommentDto;
import com.jansora.dto.Result;
import com.jansora.entity.CommentEntity;
import com.jansora.entity.UserEntity;
import com.jansora.qry.CommentQry;
import com.jansora.utils.ResultUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService extends ResultUtils {

    @Autowired
    private UserDao userDao;

    @Autowired
    private CommentDao commentDao;

    public Result query(CommentQry commentQry) {
        if(StringUtils.isEmpty(commentQry.getOwnerType()))
            return FAILED("必传参数不能为空");
        CommentEntity comment = convert(commentQry);

        return SUCCESSFUL(
                commentDao.find(comment)
                        .stream().map(this::GenerateCommentRecursiveDto).collect(Collectors.toList())
        );

    }

    public Result insert(CommentQry commentQry, UserEntity userEntity) {
        if(null == userEntity) return NOT_LOGIN();

        CommentEntity comment = convert(commentQry);
        comment.setUserId(userEntity.getId());
        commentDao.insert(comment);
        return SUCCESSFUL();
    }
    public Result update(CommentQry commentQry, UserEntity userEntity) {
        if(null == userEntity) return NOT_LOGIN();
        CommentEntity comment = commentDao.findOne(convert(commentQry));
        if(null == comment || !comment.getUserId().equals(userEntity.getId())){
            return INVALID();
        }
        commentDao.update(convert(commentQry));
        return SUCCESSFUL();
    }

    public Result delete(CommentQry commentQry, UserEntity userEntity) {
        if(null == userEntity) return NOT_LOGIN();
        CommentEntity comment = commentDao.findOne(convert(commentQry));
        if(null == comment || !comment.getUserId().equals(userEntity.getId())){
            return INVALID();
        }

        deleteCommentRecursive(comment);
        return SUCCESSFUL();
    }


    private void deleteCommentRecursive(CommentEntity comment) {

        if (null == comment || null == comment.getId()) return;

        List<CommentEntity> comments = commentDao.find(
                CommentEntity.builder()
                        .parentId(comment.getId())
                        .ownerType(comment.getOwnerType())
                        .build()
        );

        comments.forEach(this::deleteCommentRecursive);

        commentDao.delete(comment);


    }

    private CommentDto GenerateCommentRecursiveDto(CommentEntity comment) {

        CommentDto commentDto = GenerateCommentDto(comment);
        if (null == comment || null == comment.getId()) return commentDto;

        List<CommentEntity> comments = commentDao.find(
                CommentEntity.builder()
                        .parentId(comment.getId())
                        .ownerType(comment.getOwnerType())
                        .build()
        );


        if(null != comments) {
            commentDto.setChildren(
                    comments.stream()
                            .map(this::GenerateCommentRecursiveDto)
                            .collect(Collectors.toList())
            );
        }

        return commentDto;
    }

    private CommentDto GenerateCommentDto(CommentEntity comment) {

        if (null == comment || null == comment.getId()) return new CommentDto();

        CommentDto commentDto = CommentDto.builder().build();
        BeanUtils.copyProperties(comment, commentDto);

        if(null != comment.getUserId()) {
            UserEntity user = userDao.findOne(UserEntity.builder().id(comment.getUserId()).build());
            commentDto.setOwner(user);

        }
        return commentDto;
    }

    private CommentEntity convert(CommentQry commentQry) {
        CommentEntity comment = CommentEntity.builder().build();
        BeanUtils.copyProperties(commentQry, comment);
        return comment;
    }
}
