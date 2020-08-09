package com.jansora.service;

import com.jansora.dao.*;
import com.jansora.dto.PostDto;
import com.jansora.dto.Result;
import com.jansora.entity.*;
import com.jansora.qry.DocQry;
import com.jansora.utils.ResultUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PostService extends ResultUtils {

    @Autowired
    private UserDao userDao;

    @Autowired
    private DocDao docDao;

    @Autowired
    private MetaDao metaDao;

    @Autowired
    private TopicCatalogDao topicCatalogDao;

    @Autowired
    private TopicDao topicDao;

    public Result addPost(DocQry docQry, UserEntity userEntity) {
        if (null == userEntity) return NOT_LOGIN();
        DocEntity doc = convertDoc(docQry);

        String now = LocalDate.now().toString() + "-";
        docQry.setUrl(now + docQry.getUrl());

        if(null != metaDao.findOne(MetaEntity.builder().url(docQry.getUrl()).build()))
            return FAILED("URL 不能重复");

        MetaEntity meta = convertMeta(docQry);
        meta.setOwnerId(userEntity.getId());
        metaDao.insert(meta);
        doc.setOwnerId(meta.getId());
        doc.setVersion(DocEntity.Version.NORMAL.toString());
        docDao.insert(doc);
        return SUCCESSFUL(convertPostDto(meta, doc));

    }
    public Result updatePost(DocQry docQry, UserEntity userEntity) {
        if (null == userEntity) return NOT_LOGIN();
        MetaEntity meta = metaDao.findOne(MetaEntity.builder().id(docQry.getId()).build());
        if(null == meta) return FAILED("该文档不存在");
        if(!IsOwner(meta, userEntity)) return INVALID();

        if(!StringUtils.isEmpty(docQry.getUrl())) {
            MetaEntity checkUrlMeta = metaDao.findOne(MetaEntity.builder().url(docQry.getUrl()).build());
            if(null != checkUrlMeta && !docQry.getId().equals(checkUrlMeta.getId()))
                return FAILED("URL 不能重复");
            meta.setUrl(docQry.getUrl());
        }

        meta.setTitle(docQry.getTitle());


        meta.setLogo(docQry.getLogo());
        meta.setDescription(docQry.getDescription());
        meta.setTags(null != docQry.getTags() ? docQry.getTags() : new String[]{} );

        if(!StringUtils.isEmpty(docQry.getPermission())) {
            if(docQry.getPermission().equals(MetaEntity.PERMISSIONS.PUBLIC.toString())){
                meta.setPermission(docQry.getPermission());
            }
            if(docQry.getPermission().equals(MetaEntity.PERMISSIONS.PRIVATE.toString())){
                meta.setPermission(docQry.getPermission());
            }
        }
        if(!DocEntity.Version.AUTO_CREATED.toString().equals(docQry.getVersion())) {
            metaDao.update(meta);
        }

        if (DocEntity.Version.AUTO_CREATED.toString().equals(docQry.getVersion())) {
            List<DocEntity> docs = docDao.findLastDay(
                    DocEntity.builder().
                            orderBy(BaseEntity.ORDER_BY.create_at.toString())
                            .sort(DBEntity.SORT.DESC.toString())
                            .ownerId(meta.getId()).build()
            );

            if (null == docs || docs.size() < 100) {
                docDao.insert(
                        DocEntity.builder()
                                .ownerId(meta.getId())
                                .raw(docQry.getRaw())
                                .version(DocEntity.Version.AUTO_CREATED.toString())
                                .build());
            } else {
                docDao.update(
                        DocEntity.builder()
                                .id(docs.get(0).getId())
                                .ownerId(meta.getId())
                                .raw(docQry.getRaw())
                                .version(DocEntity.Version.AUTO_CREATED.toString())
                                .build());
            }
        } else {
            docDao.insert(
                    DocEntity.builder()
                            .ownerId(meta.getId())
                            .raw(docQry.getRaw())
                            .version(DocEntity.Version.NORMAL.toString())
                            .build());
        }

        return queryPost(meta.getId().toString());

    }

    public Result queryLogos(UserEntity userEntity) {

        return SUCCESSFUL(metaDao.queryLogos(userEntity));
    }

    public Result queryTags(UserEntity userEntity) {


        MetaEntity meta = formatOwner(null, userEntity);

        List<MetaEntity> metas  = metaDao.findTags(meta);
        Map<String, Long> data  = metas.stream()
//                .filter(meta -> null != meta.getTags())
                .map(MetaEntity::getTags)
                .map(Arrays:: asList)
                .reduce(new ArrayList<String>(), (List<String> all, List<String> cur) -> {
                    all.addAll(cur); return all;})
                .stream()
                .collect(Collectors.groupingBy(p -> p, Collectors.counting()));

        return SUCCESSFUL(data);
    }

    public Result queryPosts(DocQry docQry, UserEntity userEntity) {
        MetaEntity meta = formatOwner(convertMeta(docQry), userEntity);
        int count = metaDao.count(meta);
        List<PostDto> posts = metaDao.find(meta).stream().map(
                post -> convertPostDto(post, new DocEntity())).collect(Collectors.toList());
        return SUCCESSFUL(posts, count);
    }

    public Result queryPost(String resource, UserEntity userEntity) {

        Result r = queryPost(resource);
        if(r.getStatus() && null != r.getData()) {
            PostDto post = (PostDto) r.getData();
            if (post.getPermission().equals(MetaEntity.PERMISSIONS.PRIVATE.toString()) && !IsOwner(post, userEntity)) {
                return INVALID();
            }
            if(!IsOwner(post, userEntity)) {
                addReadNum(post);
            }
        }
        return r;
    }

    public Result queryPost(String resource) {
        MetaEntity meta = new MetaEntity();
        DocEntity doc;
        try {
            meta.setId(Long.valueOf(resource));
        } catch (NumberFormatException e) {
            meta.setUrl(resource);
        }
        meta = metaDao.findOne(meta);
        if(null != meta) {
            doc = docDao.findOne(
                    DocEntity.builder()
                            .ownerId(meta.getId())
                            .version(DocEntity.Version.NORMAL.toString())
                            .orderBy(BaseEntity.ORDER_BY.update_at.toString())
                            .sort(DBEntity.SORT.DESC.toString())
                            .build());
            return SUCCESSFUL(convertPostDto(meta, doc));
        }
        return FAILED("没有找到该文章");
    }

    public Result delete(Long id, UserEntity userEntity) {
        if (null == userEntity) return NOT_LOGIN();
        MetaEntity meta = metaDao.findOne(MetaEntity.builder().id(id).build());
        if(null == meta)
            return FAILED("该文档不存在");
        if(!IsOwner(meta, userEntity))
            return INVALID();
        PostDto post = (PostDto) queryPost(id.toString()).getData();
        if(null != post && null != post.getId()) {
            TopicCatalogEntity catalog = topicCatalogDao.findOne(TopicCatalogEntity.builder().docId(post.getId()).build());
            if(null != catalog && null != catalog.getDocId()) {
                TopicEntity topic = topicDao.findOne(TopicEntity.builder().id(catalog.getOwnerId()).build());
                if(null != topic) return FAILED("该文章已被 " + topic.getTitle() + " 收录");
                return FAILED("该文章不可被删除");
            }
            metaDao.delete(post);
            deleteHistoryList(post.getId());
        }

        return SUCCESSFUL();
    }

    public Result deletePostWithCatalog(Long id) {

        PostDto post = (PostDto) queryPost(id.toString()).getData();
        if(null != post && null != post.getId()) {
            metaDao.delete(post);
            deleteHistoryList(post.getId());
        }

        return SUCCESSFUL();
    }

    public void addReadNum(MetaEntity meta) {
        metaDao.updateRead(MetaEntity.builder().id(meta.getId()).build());
    }

    public Result addLike(String resource) {
        Result r = queryPost(resource);
        if(r.getStatus()) {
            PostDto post = (PostDto) r.getData();
            if(null != post && null != post.getId()) {
                metaDao.updateLike(MetaEntity.builder().id(post.getId()).build());
            }
        }
        return queryPost(resource);
    }


    public Result queryHistory(Long id) {
        DocEntity doc = docDao.findOne(DocEntity.builder().id(id).build());
        if(null != doc) {
            return SUCCESSFUL(doc);
        }
        return FAILED("没有找到该文章");
    }

    public Result queryHistoryList(Long id) {
        List<DocEntity> doc = docDao.find(
                DocEntity.builder()
                        .ownerId(id)
                        .orderBy(BaseEntity.ORDER_BY.update_at.toString())
                        .sort(DBEntity.SORT.DESC.toString())
                        .build());
        if(null != doc) {
            return SUCCESSFUL(doc);
        }
        return FAILED("没有找到该文章");
    }

    public void deleteHistoryList(Long ownerId) {
        List<DocEntity> docs = docDao.find(
                DocEntity.builder()
                        .ownerId(ownerId)
                        .build());

        docs.forEach(this::deleteHistory);
    }

    private void deleteHistory(DocEntity doc) {
        if(null != doc) {
            docDao.delete(doc);
        }
    }


    private MetaEntity formatOwner(MetaEntity meta, UserEntity user) {
        if( null == meta ) {
            meta = MetaEntity.builder().build();
        }
        if (null != user) {
            meta.setOwnerId(user.getId());
        }
        meta.setPermission(MetaEntity.PERMISSIONS.PUBLIC.toString());
        return meta;
    }

    private boolean IsOwner(MetaEntity meta, UserEntity user) {
        if(null == meta || null == user) return false;
        return meta.getOwnerId().equals(user.getId());
    }

    private DocEntity convertDoc(DocQry docQry) {
        DocEntity doc = DocEntity.builder().build();
        BeanUtils.copyProperties(docQry, doc);
        return doc;
    }

    private MetaEntity convertMeta(DocQry docQry) {
        MetaEntity meta = MetaEntity.builder().build();
        BeanUtils.copyProperties(docQry, meta);
        return meta;
    }
    private PostDto convertPostDto(MetaEntity meta, DocEntity doc) {
        UserEntity owner = null;

        PostDto post = PostDto.builder().build();
        // 顺序不能翻，要保证post的id为 meta的 id.
        BeanUtils.copyProperties(doc, post);
        BeanUtils.copyProperties(meta, post);
        if(null != meta.getOwnerId()) {
            post.setOwner(userDao.findOne(UserEntity.builder().id(meta.getOwnerId()).build()));
        }
        return post;
    }
    
}
