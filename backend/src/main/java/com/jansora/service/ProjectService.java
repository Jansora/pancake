package com.jansora.service;

import com.jansora.dao.ProjectDao;
import com.jansora.dao.UserDao;
import com.jansora.dto.ProjectDto;
import com.jansora.dto.Result;
import com.jansora.entity.ProjectEntity;
import com.jansora.entity.UserEntity;
import com.jansora.qry.ProjectQry;
import com.jansora.utils.ResultUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService extends ResultUtils {

    @Autowired
    private UserDao userDao;

    @Autowired
    private ProjectDao projectDao;
    

    public Result addProject(ProjectQry projectQry, UserEntity userEntity) {
        if (null == userEntity) return NOT_LOGIN();

        String now = LocalDate.now().toString() + "-";
        projectQry.setUrl(now + projectQry.getUrl());
        if(null != projectDao.findOne(ProjectEntity.builder().url(projectQry.getUrl()).build()))
            return FAILED("URL 不能重复");

        ProjectEntity project = convert(projectQry);
        project.setOwnerId(userEntity.getId());
        projectDao.insert(project);
        return SUCCESSFUL(convertDto(project));
    }

    public Result updateProject(ProjectQry projectQry, UserEntity userEntity) {
        if (null == userEntity) return NOT_LOGIN();
        ProjectEntity project = projectDao.findOne(ProjectEntity.builder().id(projectQry.getId()).build());
        if(null == project)
            return FAILED("该项目不存在");
        if(!project.getOwnerId().equals(userEntity.getId()))
            return INVALID();

        if(!StringUtils.isEmpty(projectQry.getUrl())) {
            ProjectEntity checkUrlProject = projectDao.findOne(ProjectEntity.builder().url(projectQry.getUrl()).build());
            if(null != checkUrlProject && !checkUrlProject.getId().equals(projectQry.getId()))
                return FAILED("URL 不能重复");
            project.setUrl(projectQry.getUrl());
        }
        if(!StringUtils.isEmpty(projectQry.getTitle())) {
            project.setTitle(projectQry.getTitle());
        }

        if(!StringUtils.isEmpty(projectQry.getLogo())) {
            project.setLogo(projectQry.getLogo());
        }
        if(!StringUtils.isEmpty(projectQry.getDescription())) {
            project.setDescription(projectQry.getDescription());
        }
        if(!StringUtils.isEmpty(projectQry.getIframe())) {
            project.setIframe(projectQry.getIframe());
        }
        if(!StringUtils.isEmpty(projectQry.getPermission())) {
            if(projectQry.getPermission().equals(ProjectEntity.PERMISSIONS.PUBLIC.toString())){
                project.setPermission(projectQry.getPermission());
            }
            if(projectQry.getPermission().equals(ProjectEntity.PERMISSIONS.PRIVATE.toString())){
                project.setPermission(projectQry.getPermission());
            }
        }


        projectDao.update(project);

        return queryProject(project.getId().toString());

    }


    public Result queryProjects(ProjectQry projectQry,  UserEntity user) {
        ProjectEntity project = formatOwner(convert(projectQry), user);

        int count = projectDao.count(project);
        List<ProjectDto> projects = projectDao.find(project).stream()
                .map(this::convertDto)
                .collect(Collectors.toList());
        return SUCCESSFUL(projects, count);
    }
    public Result queryProject(String resource, UserEntity user) {
        Result r = queryProject(resource);
        if(r.getStatus() && null != r.getData()) {
            ProjectDto project = (ProjectDto) r.getData();
            if (project.getPermission().equals(ProjectEntity.PERMISSIONS.PRIVATE.toString()) && !IsOwner(project, user)) {
                return INVALID();
            }
        }
        return r;
    }

    public Result queryProject(String resource) {
        ProjectEntity project = new ProjectEntity();
        try {
            project.setId(Long.valueOf(resource));
        } catch (NumberFormatException e) {
            project.setUrl(resource);
        }
        project = projectDao.findOne(project);
        if(null != project) {
            return SUCCESSFUL(convertDto(project));
        }
        return FAILED("没有找到该项目");
    }


    private boolean IsOwner(ProjectEntity project, UserEntity user) {
        if(null == project || null == user) return false;
        return project.getOwnerId().equals(user.getId());
    }

    private ProjectEntity formatOwner(ProjectEntity project, UserEntity user) {
        if( null == project ) {
            project = ProjectEntity.builder().build();
        }
        if (null != user) {
            project.setOwnerId(user.getId());
        }
        project.setPermission(ProjectEntity.PERMISSIONS.PUBLIC.toString());
        return project;
    }

    private ProjectEntity convert(ProjectQry projectQry) {
        ProjectEntity doc = ProjectEntity.builder().build();
        BeanUtils.copyProperties(projectQry, doc);
        return doc;
    }

    private ProjectDto convertDto(ProjectEntity projectEntity) {

        ProjectDto project = ProjectDto.builder().build();

        BeanUtils.copyProperties(projectEntity, project);
        if(null != project.getOwnerId()) {
            project.setOwner(userDao.findOne(UserEntity.builder().id(project.getOwnerId()).build()));
        }

        return project;
    }
    
}
