package com.jansora.dao;

import com.jansora.entity.ProjectEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface ProjectDao {

    int count(ProjectEntity project);

    List<ProjectEntity> find(ProjectEntity project);
    List<ProjectEntity> findLogos();
    ProjectEntity findOne(ProjectEntity project);

    void insert(ProjectEntity project);

    void update(ProjectEntity project);

    void delete(ProjectEntity project);



}
