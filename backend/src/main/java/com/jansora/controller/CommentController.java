package com.jansora.controller;

import com.jansora.dto.Result;
import com.jansora.qry.CommentQry;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("comment")
public class CommentController extends BaseController {

    @GetMapping("query")
    private Result query(CommentQry commentQry) {
        return commentService.query(commentQry) ;
    }

    @PostMapping("insert")
    private Result insert(CommentQry commentQry) {
        return commentService.insert(commentQry, findUserFromCookie()) ;
    }
    @PostMapping("update")
    private Result update(CommentQry commentQry) {
        return commentService.update(commentQry, findUserFromCookie()) ;
    }
    @PostMapping("delete")
    private Result delete(CommentQry commentQry) {
        return commentService.delete(commentQry, findUserFromCookie()) ;
    }


}
