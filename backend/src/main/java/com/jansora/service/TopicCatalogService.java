package com.jansora.service;

import com.jansora.dao.MetaDao;
import com.jansora.dao.TopicCatalogDao;
import com.jansora.dao.TopicDao;
import com.jansora.dto.CatalogDto;
import com.jansora.dto.PostDto;
import com.jansora.dto.Result;
import com.jansora.dto.TopicDto;
import com.jansora.entity.MetaEntity;
import com.jansora.entity.TopicCatalogEntity;
import com.jansora.entity.TopicEntity;
import com.jansora.entity.UserEntity;
import com.jansora.qry.CatalogQry;
import com.jansora.qry.DocQry;
import com.jansora.utils.ResultUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicCatalogService extends ResultUtils {


    @Autowired
    private MetaDao metaDao;

    @Autowired
    private TopicDao topicDao;

    @Autowired
    private TopicCatalogDao topicCatalogDao;

    @Autowired
    private PostService postService;

    @Autowired
    private TopicService topicService;

    public Result addCatalog(CatalogQry catalogQry, UserEntity userEntity) {
        if (null == userEntity) return NOT_LOGIN();

        TopicCatalogEntity catalog = convert(catalogQry);
        TopicDto topic = (TopicDto)topicService.queryTopic(catalogQry.getResource()).getData();
        if(null == topic || !topic.getOwnerId().equals(userEntity.getId())){
            return INVALID();
        }

        catalog.setOwnerId(topic.getId());
        if(TopicCatalogEntity.nodeType.doc.toString().equals(catalogQry.getNodeType())){
            Result result = postService.addPost(convertToDocQry(catalogQry), userEntity);
            if(!result.getStatus() || null == result.getData()) return result;
            PostDto post = (PostDto) result.getData();
            catalog.setDocId(post.getId());
            topicCatalogDao.insert(catalog);
            return SUCCESSFUL(post);
        }
        if(TopicCatalogEntity.nodeType.folder.toString().equals(catalogQry.getNodeType())){
            catalog.setDocId(null);
            topicCatalogDao.insert(catalog);
            return SUCCESSFUL();
        }

        return SUCCESSFUL();
    }
    public Result addDocFromExist(CatalogQry catalogQry, UserEntity userEntity) {
        if (null == userEntity) return NOT_LOGIN();

        TopicDto topic = (TopicDto)topicService.queryTopic(catalogQry.getResource()).getData();

        if(null == topic || !topic.getOwnerId().equals(userEntity.getId())){
            return INVALID();
        }

        Result result = postService.queryPost(catalogQry.getUrl());
        if(!result.getStatus() || null == result.getData()) return result;

        PostDto post = (PostDto) result.getData();
        if(!post.getOwnerId().equals(userEntity.getId())){
            return FAILED("只能收录自己创作的文章");
        }
        TopicCatalogEntity existCatalog = topicCatalogDao.findOne(TopicCatalogEntity.builder().docId(post.getId()).build());
        if(null != existCatalog) {
            TopicDto existTopic = (TopicDto)topicService.queryTopic(existCatalog.getOwnerId().toString()).getData();
            if(null != existTopic) return FAILED("该文章已被 " + existTopic.getTitle() + " 收录");
            return FAILED("该文章已被收录");
        }


        TopicCatalogEntity catalog = TopicCatalogEntity.builder()
                .ownerId(topic.getId())
                .parentId(catalogQry.getParentId())
                .docId(post.getId())
                .nodeType(TopicCatalogEntity.nodeType.doc.toString())
                .build();

        topicCatalogDao.insert(catalog);
        return SUCCESSFUL();
    }


    public Result queryCatalogs(String resource) {
        TopicDto topic = (TopicDto) topicService.queryTopic(resource).getData();
        if(null == topic || null == topic.getId()) return FAILED("专栏未找到");

        List<TopicCatalogEntity> catalogs = topicCatalogDao.find(TopicCatalogEntity.builder().ownerId(topic.getId()).parentId(0L).build());
        return SUCCESSFUL(catalogs.stream().map(this::GenerateCatalogRecursiveDto));
    }

    public Result updateCatalog(CatalogQry catalogQry, UserEntity userEntity) {
        TopicCatalogEntity catalog = topicCatalogDao.findOne(TopicCatalogEntity.builder().id(catalogQry.getId()).build());
        if(null == catalog){
            return INVALID();
        }
        TopicEntity topic = topicDao.findOne(TopicEntity.builder().id(catalog.getOwnerId()).build());
        if(null == topic || !topic.getOwnerId().equals(userEntity.getId())){
            return INVALID();
        }
        topicCatalogDao.update(TopicCatalogEntity.builder().id(catalog.getId()).title(catalogQry.getTitle()).parentId(catalogQry.getParentId()).build());
        return SUCCESSFUL();
    }


    public Result delete(Long id, UserEntity userEntity) {
        if(null == userEntity) return NOT_LOGIN();
        TopicCatalogEntity catalog = topicCatalogDao.findOne(TopicCatalogEntity.builder().id(id).build());
        if(null == catalog){
            return INVALID();
        }
        TopicEntity topic = topicDao.findOne(TopicEntity.builder().id(catalog.getOwnerId()).build());
        if(null == topic || !topic.getOwnerId().equals(userEntity.getId())){
            return INVALID();
        }

        deleteCatalogRecursive(catalog);
        return SUCCESSFUL();
    }
    public void deleteCatalogByTopicId(Long topicId) {

        if (null == topicId ) return;

        List<TopicCatalogEntity> catalogs = topicCatalogDao.find(
                TopicCatalogEntity.builder()
                        .ownerId(topicId)
                        .build()
        );

        catalogs.forEach(topicCatalogDao::delete);



    }
    public void deleteCatalogRecursive(TopicCatalogEntity catalog) {

        if (null == catalog || null == catalog.getId()) return;

        List<TopicCatalogEntity> catalogs = topicCatalogDao.find(
                TopicCatalogEntity.builder()
                        .parentId(catalog.getId())
                        .build()
        );

        catalogs.forEach(this::deleteCatalogRecursive);

        topicCatalogDao.delete(catalog);


    }

    private CatalogDto GenerateCatalogRecursiveDto(TopicCatalogEntity catalog) {

        CatalogDto catalogDto = GenerateCatalogDto(catalog);
        if (null == catalog || null == catalog.getId()) return catalogDto;

        List<TopicCatalogEntity> catalogs = topicCatalogDao.find(
                TopicCatalogEntity.builder()
                        .parentId(catalog.getId())
                        .build()
        );


        if(null != catalogs) {
            catalogDto.setChildren(
                    catalogs.stream()
                            .map(this::GenerateCatalogRecursiveDto)
                            .collect(Collectors.toList())
            );
        }

        return catalogDto;
    }



    private DocQry convertToDocQry(CatalogQry catalogQry) {
        DocQry doc = new DocQry();
        BeanUtils.copyProperties(catalogQry, doc);
        return doc;
    }
    private TopicCatalogEntity convert(CatalogQry catalogQry) {
        TopicCatalogEntity doc = TopicCatalogEntity.builder().build();
        BeanUtils.copyProperties(catalogQry, doc);
        return doc;
    }

    private CatalogDto GenerateCatalogDto(TopicCatalogEntity topicCatalogEntity) {
        if (null == topicCatalogEntity) return null;
        CatalogDto catalog = CatalogDto.builder().build();
        BeanUtils.copyProperties(topicCatalogEntity, catalog);

        if(TopicCatalogEntity.nodeType.doc.toString().equals(topicCatalogEntity.getNodeType())) {
            MetaEntity meta = metaDao.findOne(MetaEntity.builder().id(topicCatalogEntity.getDocId()).build());
            if(meta != null) {
                catalog.setMeta(meta);
            }
        }


        return catalog;
    }
    
}
