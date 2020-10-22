package com.jansora.controller;

import com.jansora.dto.Result;
import com.jansora.entity.UserEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("utils")
public class UtilsController extends BaseController {

    @PostMapping("upload")
    private Result upload(@RequestParam(value = "file") final MultipartFile file) {
        if(!isLogin()) return NOT_LOGIN();
        String fileName = file.getOriginalFilename();
        if (StringUtils.isEmpty(fileName)) {
            return FAILED("请选择文件");
        }

        UserEntity user =  findAdminUserFromCookie();
        return fileUtils.Upload(file, user.getUsername());
    }

}
