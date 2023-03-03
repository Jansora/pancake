package com.jansora.pancake.interfaces.web.controller;

import com.jansora.pancake.provider.DocumentProvider;
import com.jansora.pancake.provider.document.DocumentVersionVo;
import com.jansora.app.mars.properties.NotebookProperties;
import com.jansora.pancake.provider.notebook.NoteReq;
import com.jansora.pancake.provider.notebook.NoteVo;
import com.jansora.pancake.provider.notebook.NotebookProvider;
import com.jansora.pancake.core.auth.Auth;
import com.jansora.pancake.core.auth.Role;
import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.factory.controller.CrudControllerFactory;
import com.jansora.pancake.core.factory.controller.SearchControllerFactory;
import com.jansora.pancake.core.factory.provider.CrudProviderFactory;
import com.jansora.pancake.core.factory.provider.SearchProviderFactory;
import com.jansora.pancake.core.payload.dto.ResultDto;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 * 2020/12/02 22:53:25
 */
@RestController
@RequestMapping("notebook")
public class NotebookController implements CrudControllerFactory<NoteVo, NoteReq>, SearchControllerFactory {

    @DubboReference
    private NotebookProvider notebookProvider;

    @DubboReference
    private DocumentProvider documentProvider;

    @Autowired
    private NotebookProperties notebookProperties;

    @Override
    public CrudProviderFactory<NoteVo, NoteReq> crudFactory() {
        return notebookProvider;
    }


    @GetMapping("draft/{id}")
    public ResultDto<NoteVo> findEditableNoteById(@PathVariable Long id) throws BaseAppException {
        return ResultDto.SUCCESS(notebookProvider.findEditableNoteById(id));
    }

    /**
     * 根据文档id 查找历史文档列表
     *
     * 
     * @return 返回值
     */
    @GetMapping("versions/{id}")
    public ResultDto<List<DocumentVersionVo>> findDocumentVersionsById(@PathVariable Long id) throws BaseAppException {
        return new ResultDto<>(notebookProvider.findNoteDocumentVersionsById(id));
    }


    /*
        创建
     */
    @PostMapping("draft")
    @Auth({Role.ADMIN})
    public ResultDto<NoteVo> saveNoteDraft(@RequestBody NoteReq req) throws BaseAppException {
        return new ResultDto<>(notebookProvider.saveDraft(req));
    }

    /*
        创建
     */
    @PostMapping("share/{id}")
    @Auth({Role.ADMIN})
    public ResultDto<String> sharing(@PathVariable Long id) throws BaseAppException {
        return new ResultDto<>(notebookProperties.getShareUrlPrefix() + notebookProvider.sharing(id));
    }
    /*
        创建
     */
    @GetMapping("share/{hash}")
    @Auth({Role.ADMIN})
    public ResultDto<NoteVo> share(@PathVariable String hash) throws BaseAppException {
        return new ResultDto<>(notebookProvider.findByHash(hash));
    }

    /*
    创建
 */
    @DeleteMapping("share/{hash}")
    @Auth({Role.ADMIN})
    public ResultDto<NoteVo> cancelSharing(@PathVariable String hash) throws BaseAppException {
        return new ResultDto<>(notebookProvider.cancelSharing(hash));
    }

    @Override
    public SearchProviderFactory searchFactory() {
        return notebookProvider;
    }
}
