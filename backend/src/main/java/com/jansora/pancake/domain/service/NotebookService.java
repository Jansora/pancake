package com.jansora.pancake.domain.service;

import com.jansora.app.hole.provider.DocumentProvider;
import com.jansora.app.hole.provider.ShareProvider;
import com.jansora.app.hole.provider.document.*;
import com.jansora.app.hole.provider.share.ShareReq;
import com.jansora.app.hole.provider.share.ShareSource;
import com.jansora.app.hole.provider.share.ShareVo;
import com.jansora.app.space.domain.notebook.repository.NoteSaveRepository;
import com.jansora.app.space.domain.notebook.repository.persistence.model.NoteDo;
import com.jansora.app.space.provider.notebook.NoteReq;
import com.jansora.app.space.provider.notebook.NoteVo;
import com.jansora.repo.core.context.AuthContext;
import com.jansora.repo.core.exception.BaseAppException;
import com.jansora.repo.core.exception.dao.DataLogicErrorException;
import com.jansora.repo.core.exception.dao.DataOperationException;
import com.jansora.repo.core.factory.repository.CrudRepositoryFactory;
import com.jansora.repo.core.factory.repository.SearchRepositoryFactory;
import com.jansora.repo.core.factory.service.CrudServiceFactory;
import com.jansora.repo.core.factory.service.SearchServiceFactory;
import com.jansora.repo.core.utils.AssertUtils;
import com.jansora.repo.mysql.repository.ValidateRepository;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class NotebookService implements SearchServiceFactory, CrudServiceFactory<NoteVo, NoteReq> {

    @Autowired
    NoteSaveRepository noteSaveRepository;

    @Autowired
    ValidateRepository validateRepository;

    @DubboReference
    DocumentProvider documentProvider;

    @DubboReference
    ShareProvider shareProvider;

    @Override
    public CrudRepositoryFactory<NoteVo, NoteReq> crudFactory() {
        return noteSaveRepository;
    }

    @Override
    public SearchRepositoryFactory searchFactory() {
        return noteSaveRepository;
    }

    /**
     * 根据主键查找
     *
     * 
     * @return 返回值
     */
    public NoteVo findById(Long id) throws BaseAppException {

        NoteVo note = noteSaveRepository.findById(id);

        validateRepository.readable(NoteDo.TABLE_NAME, id, AuthContext.auth().getAuthId());
        note.setRaw(documentProvider.findById(note.getDocumentId()).getRaw());
        return note;
    }

    /**
     * 根据主键查找
     *
     * 
     * @return 返回值
     */
    public NoteVo findEditableNoteById(Long id) throws BaseAppException {
        NoteVo note = noteSaveRepository.findById(id);
        note.setRaw(documentProvider.findEditableRawById(note.getDocumentId()));
        return note;
    }

    public NoteVo findByHash(String hash) throws BaseAppException {
        ShareVo share = shareProvider.findByHash(hash);
        AssertUtils.isTrue(ShareSource.NOTEBOOK.source().equals(share.getSource()));

        return this.findById(share.getSourceId());
    }

    public NoteVo cancelSharing(@PathVariable String hash) throws BaseAppException {
        NoteVo note = this.findByHash(hash);
        shareProvider.deleteByHash(hash);
        return note;
    }


    public List<DocumentVersionVo> findNoteDocumentVersionsById(Long id) throws BaseAppException {
        return documentProvider.findVersionsById(noteSaveRepository.findById(id).getDocumentId());
    }

    /**
     * 保存实体
     * 有实体主键则更新， 没有则保存
     *
     * 
     * @return 实体
     */
    @Transactional
    public NoteVo saveDraft(NoteReq req) throws BaseAppException, DataOperationException {
        AssertUtils.nonNull(req, req.getId());
        DocumentReq documentReq = new DocumentReq();

        documentReq.setSource(DocumentSource.NOTEBOOK.source());
        documentReq.setSourceId(req.getId());
        documentReq.setId(noteSaveRepository.findById(req.getId()).getDocumentId());
        documentReq.setRaw(req.getRaw());
        documentReq.setStatus(DocumentStatus.AUTO_CREATED.status());
        documentProvider.save(documentReq);
        return this.findEditableNoteById(req.getId());
    }


    /**
     * 保存实体
     * 有实体主键则更新， 没有则保存
     *
     * 
     * @return 实体
     */
    @Transactional
    public NoteVo save(NoteReq req) throws BaseAppException {
        NoteVo resp = noteSaveRepository.save(req);
        DocumentReq documentReq = new DocumentReq();
        documentReq.setSource(DocumentSource.NOTEBOOK.source());
        documentReq.setStatus(DocumentStatus.PUBLISH.status());
        documentReq.setSourceId(resp.getId());
        documentReq.setRaw(req.getRaw());
        documentReq.setId(resp.getDocumentId());
        DocumentVo document = documentProvider.save(documentReq);

        // 缓存 doc
        NoteReq saveDocInfo = new NoteReq();
        saveDocInfo.setId(resp.getId());
        saveDocInfo.setDocumentId(document.getId());
        noteSaveRepository.save(saveDocInfo);
        return this.findById(resp.getId());
    }

    public String share(Long id) throws BaseAppException {

        ShareVo share = shareProvider.save(ShareReq.builder().sourceId(id).source(ShareSource.NOTEBOOK.source()).build());

        return share.getHash();

    }


    /**
     * 删除实体
     *
     * 
     * @return 被删除的实体
     */
    @Transactional
    public NoteVo deleteById(Long id) throws BaseAppException, DataLogicErrorException {
        NoteVo resp = this.findById(id);

        noteSaveRepository.deleteById(id);
        documentProvider.deleteById(resp.getDocumentId());

        return resp;
    }

}
