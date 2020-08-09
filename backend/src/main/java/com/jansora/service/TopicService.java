package com.jansora.service;

import com.jansora.dao.TopicCatalogDao;
import com.jansora.dao.TopicDao;
import com.jansora.dao.UserDao;
import com.jansora.dto.Result;
import com.jansora.dto.TopicDto;
import com.jansora.entity.MetaEntity;
import com.jansora.entity.TopicCatalogEntity;
import com.jansora.entity.TopicEntity;
import com.jansora.entity.UserEntity;
import com.jansora.qry.TopicQry;
import com.jansora.utils.ResultUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicService extends ResultUtils {

    @Autowired
    private UserDao userDao;

    @Autowired
    private TopicDao topicDao;

    @Autowired
    private TopicCatalogDao topicCatalogDao;

    @Autowired
    private TopicCatalogService topicCatalogService;

    public Result addTopic(TopicQry topicQry, UserEntity userEntity) {
        if (null == userEntity) return NOT_LOGIN();

        String now = LocalDate.now().toString() + "-";
        topicQry.setUrl(now + topicQry.getUrl());
        if(null != topicDao.findOne(TopicEntity.builder().url(topicQry.getUrl()).build()))
            return FAILED("URL 不能重复");

        TopicEntity topic = convert(topicQry);
        topic.setOwnerId(userEntity.getId());
        topicDao.insert(topic);
        return SUCCESSFUL(convertDto(topic));
    }

    public Result updateTopic(TopicQry topicQry, UserEntity userEntity) {
        if (null == userEntity) return NOT_LOGIN();
        TopicEntity topic = topicDao.findOne(TopicEntity.builder().id(topicQry.getId()).build());
        if(null == topic)
            return FAILED("该专栏不存在");
        if(!topic.getOwnerId().equals(userEntity.getId()))
            return INVALID();

        if(!StringUtils.isEmpty(topicQry.getUrl())) {
            TopicEntity checkUrlTopic = topicDao.findOne(TopicEntity.builder().url(topicQry.getUrl()).build());
            if(null != checkUrlTopic && !checkUrlTopic.getId().equals(topicQry.getId()))
                return FAILED("URL 不能重复");
            topic.setUrl(topicQry.getUrl());
        }
        if(!StringUtils.isEmpty(topicQry.getTitle())) {
            topic.setTitle(topicQry.getTitle());
        }

        if(!StringUtils.isEmpty(topicQry.getLogo())) {
            topic.setLogo(topicQry.getLogo());
        }
        if(!StringUtils.isEmpty(topicQry.getDescription())) {
            topic.setDescription(topicQry.getDescription());
        }
        if(!StringUtils.isEmpty(topicQry.getPermission())) {
            if(topicQry.getPermission().equals(MetaEntity.PERMISSIONS.PUBLIC.toString())){
                topic.setPermission(topicQry.getPermission());
            }
            if(topicQry.getPermission().equals(MetaEntity.PERMISSIONS.PRIVATE.toString())){
                topic.setPermission(topicQry.getPermission());
            }
        }


        topicDao.update(topic);

        return queryTopic(topic.getId().toString());

    }


    public Result queryTopics(TopicQry topicQry,  UserEntity user) {
        TopicEntity topic = formatOwner(convert(topicQry), user);

        int count = topicDao.count(topic);
        List<TopicDto> topics = topicDao.find(topic).stream()
                .map(this::convertDto)
                .collect(Collectors.toList());
        return SUCCESSFUL(topics, count);
    }
    public Result queryTopic(String resource, UserEntity user) {
        Result r = queryTopic(resource);
        if(r.getStatus() && null != r.getData()) {
            TopicDto topic = (TopicDto) r.getData();
            if (topic.getPermission().equals(MetaEntity.PERMISSIONS.PRIVATE.toString()) && !IsOwner(topic, user)) {
                return INVALID();
            }
        }
        return r;
    }

    public Result queryTopic(String resource) {

        Long id = getIdFromResource(resource);
        if(null == id) return FAILED("没有找到该专栏");
        TopicEntity topic = TopicEntity.builder().id(id).build();

        topic = topicDao.findOne(topic);
        if(null != topic) {
            return SUCCESSFUL(convertDto(topic));
        }
        return FAILED("没有找到该专栏");
    }

    public Result delete(String resource, UserEntity userEntity) {

        Long id = getIdFromResource(resource);
        if(null == id) return FAILED("没有找到该专栏");

        TopicEntity topic = topicDao.findOne(TopicEntity.builder().id(id).build());
        if(null == topic || !topic.getOwnerId().equals(userEntity.getId())){
            return INVALID();
        }

        topicCatalogService.deleteCatalogByTopicId(topic.getId());
        return SUCCESSFUL();
    }
    private Long getIdFromResource(String resource) {
        TopicEntity topic = new TopicEntity();
        try {
            topic.setId(Long.valueOf(resource));
        } catch (NumberFormatException e) {
            topic.setUrl(resource);
        }
        topic = topicDao.findOne(topic);
        return topic == null ? null : topic.getId();
    }
    private boolean IsOwner(TopicEntity topic, UserEntity user) {
        if(null == topic || null == user) return false;
        return topic.getOwnerId().equals(user.getId());
    }

    private TopicEntity formatOwner(TopicEntity topic, UserEntity user) {
        if( null == topic ) {
            topic = TopicEntity.builder().build();
        }
        if (null != user) {
            topic.setOwnerId(user.getId());
        }
        topic.setPermission(MetaEntity.PERMISSIONS.PUBLIC.toString());
        return topic;
    }

    private TopicEntity convert(TopicQry topicQry) {
        TopicEntity doc = TopicEntity.builder().build();
        BeanUtils.copyProperties(topicQry, doc);
        return doc;
    }

    private TopicDto convertDto(TopicEntity topicEntity) {

        TopicDto topic = TopicDto.builder().build();

        BeanUtils.copyProperties(topicEntity, topic);
        if(null != topic.getOwnerId()) {
            topic.setOwner(userDao.findOne(UserEntity.builder().id(topic.getOwnerId()).build()));
        }
        if(null != topic.getId()) {
            topic.setTotal(topicCatalogDao.count(
                    TopicCatalogEntity.builder()
                            .ownerId(topic.getId())
                            .nodeType(TopicCatalogEntity.nodeType.doc.toString())
                            .build())
            );
        }

        return topic;
    }
    
}
