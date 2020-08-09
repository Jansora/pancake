package com.jansora.controller;

import com.jansora.dto.Result;
import com.jansora.qry.TopicQry;
import com.jansora.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("topic")
public class TopicController extends BaseController {

    @Autowired
    protected TopicService topicService;
    
    
    @PostMapping("add")
    private Result add(TopicQry topicQry) {
        if(StringUtils.isEmpty(topicQry.getTitle())) return FAILED("标题不能为空");
        if(StringUtils.isEmpty(topicQry.getUrl())) return FAILED("url不能为空");
        if(!isLogin()) return NOT_LOGIN();
        return topicService.addTopic(topicQry, findAdminUserFromCookie());
    }
    @PostMapping("update")
    private Result update(TopicQry topicQry) {
        if( null == topicQry.getId()) return FAILED("id不能为空");
        if(StringUtils.isEmpty(topicQry.getTitle())) return FAILED("标题不能为空");
        if(StringUtils.isEmpty(topicQry.getUrl())) return FAILED("url不能为空");
        if(!isLogin()) return NOT_LOGIN();
        return topicService.updateTopic(topicQry, findAdminUserFromCookie());
    }

    @GetMapping("{resource}")
    private Result queryTopic(@PathVariable String resource) {
        return topicService.queryTopic(resource,  findAdminUserFromCookie());
    }

    @GetMapping("queryTopics")
    private Result queryTopics(TopicQry topicQry) {
        return topicService.queryTopics(topicQry,  findAdminUserFromCookie());
    }

    @DeleteMapping("{resource}")
    private Result delete(@PathVariable String resource) {

        return topicService.delete(resource, findAdminUserFromCookie());
    }



}
