package com.jansora.pancake.provider.notebook;

import com.jansora.app.hole.provider.document.DocumentVersionVo;
import com.jansora.repo.core.exception.BaseAppException;
import com.jansora.repo.core.factory.provider.CrudProviderFactory;
import com.jansora.repo.core.factory.provider.SearchProviderFactory;

import java.util.List;

/**
 * <Description> <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @date 2022/8/9 PM08:17 <br>
 * @since 1.0 <br>
 */
public interface NotebookProvider extends SearchProviderFactory, CrudProviderFactory<NoteVo, NoteReq> {



    public NoteVo findByHash(String id) throws BaseAppException;

    public NoteVo cancelSharing(String hash) throws BaseAppException;

    /**
     * 根据 id 查找 Note
     */
    public NoteVo findEditableNoteById(Long id) throws BaseAppException;

    List<DocumentVersionVo> findNoteDocumentVersionsById(Long id) throws BaseAppException;

    /**
     * 根据条件更新
     * 
     * @return Optional<NoteDto>
     */
    public NoteVo saveDraft(NoteReq req) throws BaseAppException;


    public String sharing(Long id) throws BaseAppException;

}
