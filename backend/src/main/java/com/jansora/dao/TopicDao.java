package com.jansora.dao;

import com.jansora.entity.TopicEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface TopicDao {

    int count(TopicEntity topic);

    List<TopicEntity> find(TopicEntity topic);
    List<TopicEntity> findLogos();
    TopicEntity findOne(TopicEntity topic);

    void insert(TopicEntity topic);

    void update(TopicEntity topic);

    void delete(TopicEntity topic);



}
