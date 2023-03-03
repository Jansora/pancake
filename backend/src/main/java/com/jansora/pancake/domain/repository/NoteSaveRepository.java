package com.jansora.pancake.domain.repository;

import com.jansora.app.space.domain.notebook.repository.persistence.mapper.NoteMapper;
import com.jansora.app.space.domain.notebook.repository.persistence.model.NoteDo;
import com.jansora.app.space.provider.codehub.ActionReq;
import com.jansora.app.space.provider.notebook.NoteReq;
import com.jansora.app.space.provider.notebook.NoteVo;
import com.jansora.repo.core.context.AuthContext;
import com.jansora.repo.core.exception.BaseAppException;
import com.jansora.repo.core.exception.dao.DataLogicErrorException;
import com.jansora.repo.core.exception.dao.DataNotFoundException;
import com.jansora.repo.core.factory.mapper.SearchMapper;
import com.jansora.repo.core.factory.repository.CrudRepositoryFactory;
import com.jansora.repo.core.payload.vo.SearchVo;
import com.jansora.repo.core.utils.AssertUtils;
import com.jansora.repo.mysql.factory.repository.AbstractSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Objects;

@Repository
public class NoteSaveRepository extends AbstractSearchRepository implements CrudRepositoryFactory<NoteVo, NoteReq> {
    

    @Autowired
    NoteMapper noteMapper;

    @Autowired
    SearchMapper searchMapper;

    /**
     * 获取表名
     */
    @Override
    public String tableName() {
        return NoteDo.TABLE_NAME;
    }

    /**
     * search mapper
     */
    @Override
    public SearchMapper searchMapper() {
        return searchMapper;
    }

    /**
     * 根据主键查找
     *
     * 
     * @return 返回值
     */
    @Override
    public NoteVo findById(Long id) throws BaseAppException {
        NoteDo record = noteMapper.selectByPrimaryKey(id).orElseThrow(DataNotFoundException::new);

        NoteVo result = new NoteVo();

        SearchVo.overrideSearch(result, record);

        result.setDocumentId(record.getDocumentId());


        return result;
    }

    /**
     * 保存实体
     * 有实体主键则更新， 没有则保存
     *
     * 
     * @return 实体
     */
    @Override
    public NoteVo save(NoteReq req) throws BaseAppException {
        AssertUtils.isFalse(AuthContext.empty());

        Date now = new Date();

        NoteDo record = new NoteDo();

        // 先新建
        if (Objects.isNull(req.getId())) {
            record.setUserId(AuthContext.auth().getAuthId());
            record.setEnabled(req.getEnabled());
            record.setCreatedAt(now);
            noteMapper.insert(record);
            req.setId(record.getId());
        }

        // 再更新
        record.setId(req.getId());
        record.setUpdatedAt(now);
        ActionReq.overrideSearch(record, req);
        record.setDocumentId(req.getDocumentId());
        noteMapper.updateByPrimaryKeySelective(record);

        return this.findById(req.getId());
    }

    /**
     * 删除实体
     *
     * 
     * @return 被删除的实体
     */
    @Override
    public NoteVo deleteById(Long id) throws BaseAppException {

        NoteVo result = this.findById(id);
        if (Objects.isNull(result.getDocumentId())) {
            throw new DataLogicErrorException();
        }
        noteMapper.deleteByPrimaryKey(id);

        return result;
    }



}
