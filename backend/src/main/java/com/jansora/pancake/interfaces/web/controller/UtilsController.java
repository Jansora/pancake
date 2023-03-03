package com.jansora.pancake.interfaces.web.controller;

import com.jansora.app.mars.configuration.auth.WebAuthContext;
import com.jansora.pancake.core.auth.Auth;
import com.jansora.pancake.core.auth.Role;
import com.jansora.pancake.core.exception.auth.ForbiddenException;
import com.jansora.pancake.core.exception.auth.UnauthorizedException;
import com.jansora.pancake.core.exception.web.BadRequestException;
import com.jansora.pancake.core.exception.web.InvalidArgumentException;
import com.jansora.pancake.core.payload.dto.ResultDto;
import com.jansora.pancake.core.utils.AssertUtils;
import com.jansora.pancake.storage.payload.UploadDto;
import com.jansora.pancake.storage.repository.StorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("utils")
public class UtilsController {

    @Autowired
    StorageRepository storageRepository;

    @PostMapping("uploads")
    @Auth({Role.ADMIN})
    public ResultDto<List<UploadDto>> uploads(@RequestParam(value = "file") MultipartFile[] files) throws BadRequestException, ForbiddenException, ForbiddenException, BadRequestException, UnauthorizedException {

        String currentUserName = WebAuthContext.getCurrentUser().getUsername();
        List<UploadDto> result = new ArrayList<>();
        for (MultipartFile file: files) {
            result.add(storageRepository.upload(file, currentUserName));
        }

        return new ResultDto<>(result);
    }

    @PostMapping("upload")
    @Auth({Role.ADMIN})
    public ResultDto<UploadDto> upload(@RequestParam(value = "file") final MultipartFile file) throws UnauthorizedException, BadRequestException, InvalidArgumentException, BadRequestException, ForbiddenException {
        AssertUtils.strNonNull(file.getOriginalFilename());
        AssertUtils.nonNull(file);
//        return new ResultDto<>(storageUtils.Upload(file, "test"));
        return new ResultDto<>(storageRepository.upload(file, WebAuthContext.getCurrentUser().getUsername()));
    }

}
