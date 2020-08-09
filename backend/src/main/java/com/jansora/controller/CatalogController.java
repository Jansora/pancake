package com.jansora.controller;

import com.jansora.dto.Result;
import com.jansora.qry.CatalogQry;
import com.jansora.service.TopicCatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("catalog")
public class CatalogController extends BaseController {

    @Autowired
    protected TopicCatalogService topicCatalogService;
    
    
    @PostMapping("add")
    private Result add(CatalogQry catalogQry) {
        if(StringUtils.isEmpty(catalogQry.getTitle())) return FAILED("标题不能为空");

        if(!isLogin()) return NOT_LOGIN();
        return topicCatalogService.addCatalog(catalogQry, findAdminUserFromCookie());
    }
    @PostMapping("addDocFromExist")
    private Result addDocFromExist(CatalogQry catalogQry) {

        if(!isLogin()) return NOT_LOGIN();
        return topicCatalogService.addDocFromExist(catalogQry, findAdminUserFromCookie());
    }



    @PostMapping("update")
    private Result update(CatalogQry catalogQry) {
        if( null == catalogQry.getId()) return FAILED("id不能为空");

        if(!isLogin()) return NOT_LOGIN();
        return topicCatalogService.updateCatalog(catalogQry, findAdminUserFromCookie());
    }

    @DeleteMapping("{id}")
    private Result delete(@PathVariable Long id) {
        return topicCatalogService.delete(id, findAdminUserFromCookie());
    }


    @GetMapping("{resource}")
    private Result queryCatalogs(@PathVariable String resource) {
        return topicCatalogService.queryCatalogs(resource);
    }




}
