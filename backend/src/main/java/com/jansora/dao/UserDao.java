package com.jansora.dao;

import com.jansora.entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface UserDao {

    int count(UserEntity user);

    List<UserEntity> find(UserEntity user);

    UserEntity findOne(UserEntity user);

    void insert(UserEntity user);

    void update(UserEntity user);

    void delete(UserEntity user);



}
