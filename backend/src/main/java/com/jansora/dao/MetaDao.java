package com.jansora.dao;

import com.jansora.entity.MetaEntity;
import com.jansora.entity.QueryLogoEntity;
import com.jansora.entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface MetaDao  {

    List<QueryLogoEntity> queryLogos(UserEntity userEntity);

    int count(MetaEntity meta);

    List<MetaEntity> find(MetaEntity meta);

    List<MetaEntity> findTags(MetaEntity meta);
    List<MetaEntity> findLogos();

    MetaEntity findOne(MetaEntity meta);

    void insert(MetaEntity meta);

    void update(MetaEntity meta);

    void updateRead(MetaEntity meta);

    void updateLike(MetaEntity meta);

    void delete(MetaEntity meta);

}
