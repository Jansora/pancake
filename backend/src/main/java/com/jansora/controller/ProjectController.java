package com.jansora.controller;

import com.jansora.dto.Result;
import com.jansora.qry.ProjectQry;
import com.jansora.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("project")
public class ProjectController extends BaseController {

    @Autowired
    protected ProjectService projectService;
    
    
    @PostMapping("add")
    private Result add(ProjectQry projectQry) {
        if(StringUtils.isEmpty(projectQry.getTitle())) return FAILED("标题不能为空");
        if(StringUtils.isEmpty(projectQry.getUrl())) return FAILED("url不能为空");
        if(!isLogin()) return NOT_LOGIN();
        return projectService.addProject(projectQry, findAdminUserFromCookie());
    }
    @PostMapping("update")
    private Result update(ProjectQry projectQry) {
        if( null == projectQry.getId()) return FAILED("id不能为空");
        if(StringUtils.isEmpty(projectQry.getTitle())) return FAILED("标题不能为空");
        if(StringUtils.isEmpty(projectQry.getUrl())) return FAILED("url不能为空");
        if(!isLogin()) return NOT_LOGIN();
        return projectService.updateProject(projectQry, findAdminUserFromCookie());
    }

    @GetMapping("{resource}")
    private Result queryProject(@PathVariable String resource) {
        return projectService.queryProject(resource,  findAdminUserFromCookie());
    }

    @GetMapping("queryProjects")
    private Result queryProjects(ProjectQry projectQry) {
        return projectService.queryProjects(projectQry,  findAdminUserFromCookie());
    }




}
