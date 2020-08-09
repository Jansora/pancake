package com.jansora.dao;

import com.jansora.entity.TopicCatalogEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface TopicCatalogDao {

    int count(TopicCatalogEntity catalog);

    List<TopicCatalogEntity> find(TopicCatalogEntity catalog);

    TopicCatalogEntity findOne(TopicCatalogEntity catalog);

    void insert(TopicCatalogEntity catalog);

    void update(TopicCatalogEntity catalog);

    void delete(TopicCatalogEntity catalog);



}
