package com.jansora.dao;

import com.jansora.entity.CommentEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface CommentDao {

    int count(CommentEntity comment);
    List<CommentEntity> find(CommentEntity comment);
    CommentEntity findOne(CommentEntity comment);
    void insert(CommentEntity comment);

    void update(CommentEntity comment);

    void delete(CommentEntity comment);


}
