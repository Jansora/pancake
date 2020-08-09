package com.jansora.utils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectRequest;
import com.jansora.dto.Result;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

public class OssUtils {

    private static final Boolean UseOss = Boolean.valueOf(System.getenv("OSS_AVAILABLE"));


    private static final String EndPoint = System.getenv("OSS_ENDPOINT");
    private static final String AccessKeyId = System.getenv("OSS_ACCESS_KEY_ID");
    private static final String AccessKeySecret = System.getenv("OSS_ACCESS_SECRET");
    private static final String Bucket = System.getenv("OSS_BUCKET");
    private static final String AliasDomain = System.getenv("OSS_ALIAS_DOMAIN");
    private static final String OssReturnPrefix = System.getenv("OSS_RETURN_PREFIX");


    private static final String localDomain = System.getenv("LOCAL_DOMAIN");
    private static final String localLocation = System.getenv("LOCAL_LOCATION");

    private static final String localReturnPrefix = System.getenv("LOCAL_RETURN_PREFIX");

    private static final OSS ossClient =  new OSSClientBuilder().build(EndPoint, AccessKeyId, AccessKeySecret);





    public Result Upload(MultipartFile file, String username) {

        return UseOss ? SaveToOSS(file, username) : SaveToLocal(file, username);

    }

    public Result SaveToLocal(MultipartFile file, String username) {

        String filename = file.getOriginalFilename();
        String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        String localSaveFolder =  Paths.get(localLocation, username, date).toString();
        String localReturnFolder = Paths.get(localReturnPrefix, username, date).toString();
        File folder = new File(localSaveFolder);
        if (!folder.isDirectory() && !folder.mkdirs()) {
            return ResultUtils.FAILED("文件夹创建失败");
        }
        File fp = new File(Paths.get(localSaveFolder, filename).toString());
        try (OutputStream os = new FileOutputStream(fp)) {
            os.write(file.getBytes());
        } catch (Exception e) {
            return ResultUtils.FAILED("文件创建失败");
        }
        return ResultUtils.SUCCESSFUL(localDomain + localReturnFolder + '/' + filename);

    }


    public Result SaveToOSS(MultipartFile file, String username) {

        String Path =  OssReturnPrefix + username
                + new SimpleDateFormat("/yyyy/MM/dd/").format(new Date())
                + file.getOriginalFilename();
        try {
            PutObjectRequest putObjectRequest = new PutObjectRequest(
                    Bucket, Path, file.getInputStream());
            ossClient.putObject(putObjectRequest);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResultUtils.SUCCESSFUL(AliasDomain + "/" + Path);
    }

}
