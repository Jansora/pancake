package com.jansora.dao;

import com.jansora.entity.DocEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface DocDao {

    int count(DocEntity user);

    List<DocEntity> find(DocEntity doc);
    List<DocEntity> findLastDay(DocEntity doc);


    DocEntity findOne(DocEntity doc);

    void insert(DocEntity doc);

    void update(DocEntity doc);

    void delete(DocEntity doc);
}
