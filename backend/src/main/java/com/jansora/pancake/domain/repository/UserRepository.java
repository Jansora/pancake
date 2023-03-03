package com.jansora.pancake.domain.repository;

import com.jansora.pancake.domain.converter.UserConverter;
import com.jansora.pancake.domain.repository.persistence.mapper.UserMapper;
import com.jansora.pancake.domain.repository.persistence.model.UserDo;
import com.jansora.pancake.provider.user.UserReq;
import com.jansora.pancake.provider.user.UserVo;
import com.jansora.pancake.core.auth.Role;
import com.jansora.pancake.core.context.AuthContext;
import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.exception.auth.ForbiddenException;
import com.jansora.pancake.core.exception.dao.DataNotFoundException;
import com.jansora.pancake.core.factory.repository.CrudRepositoryFactory;
import com.jansora.pancake.mysql.repository.ValidateRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Objects;


@Repository
@AllArgsConstructor
public class UserRepository implements CrudRepositoryFactory<UserVo, UserReq> {

    UserMapper userMapper;

    UserConverter userConverter;

    ValidateRepository validateRepository;


    /**
     * 可读性
     *
     * @param id 主键
     */
    @Override
    public boolean readable(Long id) {
        return true;
    }

    /**
     * 可编辑性
     *
     * @param targetId targetId
     */
    @Override
    public boolean editable(Long targetId) {
        if (Objects.isNull(targetId)) {
            return Role.ADMIN.role().equals(AuthContext.auth().getRole().role());
        }
        return Objects.equals(targetId, AuthContext.auth().getAuthId());

    }

    /**
     * 根据主键查找
     *
     * 
     * @return 返回值
     */
    @Override
    public UserVo findById(Long id) throws BaseAppException {
        if (readable(id)) {
            return userConverter.toVo(userMapper.selectByPrimaryKey(id).orElseThrow(DataNotFoundException::new));
        }
        throw new ForbiddenException();
    }


    /**
     * 保存实体
     * 有实体主键则更新， 没有则保存
     *
     * 
     * @return 实体
     */
    @Override
    public UserVo save(UserReq req) throws BaseAppException {
        if (!editable(req.getId())) {
            throw new ForbiddenException();
        }

        UserDo record = userConverter.toDo(req);

        if (Objects.isNull(record.getId())) {
            userMapper.insert(record);
        }
        else {
            userMapper.updateByPrimaryKeySelective(record);
        }

        return this.findById(record.getId());
    }

    /**
     * 删除实体
     *
     * 
     * @return 被删除的实体
     */
    @Override
    public UserVo deleteById(Long id) throws BaseAppException {
        if (!editable(id)) {
            throw new ForbiddenException();
        }
        UserVo resp = this.findById(id);
        userMapper.deleteByPrimaryKey(id);
        return resp;
    }

}
