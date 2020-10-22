package com.jansora.controller;

import com.jansora.dto.Result;
import com.jansora.qry.DocQry;
import com.jansora.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("post")
public class PostController extends BaseController {

    @Autowired
    protected PostService postService;

    @GetMapping("queryTags")
    private Result queryTags() {
        return postService.queryTags( findAdminUserFromCookie());
    }

    @GetMapping("queryLogos")
    private Result queryLogos() {
        return postService.queryLogos( findAdminUserFromCookie());
    }

    @PostMapping("add")
    private Result add(DocQry docQry) {
        if(StringUtils.isEmpty(docQry.getTitle())) return FAILED("标题不能为空");
        if(StringUtils.isEmpty(docQry.getUrl())) return FAILED("url不能为空");
        if(!isLogin()) return NOT_LOGIN();
        return postService.addPost(docQry, findAdminUserFromCookie());
    }
    @PostMapping("update")
    private Result update(DocQry docQry) {
        if( null == docQry.getId()) return FAILED("id不能为空");
        if(StringUtils.isEmpty(docQry.getTitle())) return FAILED("标题不能为空");
        if(StringUtils.isEmpty(docQry.getUrl())) return FAILED("url不能为空");
        if(!isLogin()) return NOT_LOGIN();
        return postService.updatePost(docQry, findAdminUserFromCookie());
    }

    @PostMapping("autoSave")
    private Result autoSave(DocQry docQry) {
        if( null == docQry.getId()) return FAILED("id不能为空");
        if(!isLogin()) return NOT_LOGIN();
        return postService.updatePost(docQry, findAdminUserFromCookie());
    }

    @GetMapping("{resource}")
    private Result query(@PathVariable String resource) {
        return postService.queryPost(resource,  findAdminUserFromCookie());
    }

    @DeleteMapping("{id}")
    private Result delete(@PathVariable Long id) {
        return postService.delete(id, findAdminUserFromCookie());
    }

    @PostMapping("addLike/{resource}")
    private Result addLike(@PathVariable String resource) {
        return postService.addLike(resource);
    }

    @GetMapping("queryPosts")
    private Result queryPosts(DocQry docQry) {
        return postService.queryPosts(docQry,  findAdminUserFromCookie());
    }


    @GetMapping("queryHistory/{id}")
    private Result queryHistory(@PathVariable Long id) {
        return postService.queryHistory(id);
    }

    @GetMapping("queryHistoryList/{id}")
    private Result queryHistoryList(@PathVariable Long id) {
        return postService.queryHistoryList(id);
    }


}
