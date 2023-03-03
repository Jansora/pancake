package com.jansora.pancake.core.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * <Description> Description for FileUtils <br>
 *
 * @author zhang.yangyuan <br>
 * @version 1.0<br>
 * @CreateDate 2021/5/18 16:41:06 <br>
 * @since 1.0<br>
 */
public class FileUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(FileUtils.class);

    public static boolean mkdir(String path) {
        try {
            Files.createDirectories(Paths.get(path));
            return true;
        } catch (IOException e) {
            LOGGER.error("create folder failed, path={}", path);
            return false;
        }
    }

    /**
     * 写文件
     *
     * @param file    文件路径
     * @param content 文本内容
     * @param append  是否追加
     * @return true / false
     */
    public static boolean writeFile(File file, String content, boolean append) {
        FileWriter writer = null;
        boolean status = true;
        try {
            //打开一个写文件器，构造函数中的第二个参数true表示以追加形式写文件,如果为 true，则将字节写入文件末尾处，而不是写入文件开始处
            writer = new FileWriter(file, append);
            writer.write(content);
        } catch (IOException e) {
            LOGGER.error("writeFile writer.write(content) writer.close() failed");
            status = false;
        } finally {
            if (writer != null) {
                try {
                    writer.flush();
                } catch (IOException e) {
                    LOGGER.error("writeFile writer.flush() failed");
                    status = false;
                }
                try {
                    writer.close();
                } catch (IOException e) {
                    LOGGER.error("commitErrorLog  writer.close() failed");
                    status = false;
                }
            }
        }
        return status;
    }

    /**
     * 一次性压缩多个文件，文件存放至一个文件夹中
     */
    public static boolean ZipMultiFile(String filepath, String zipPath) {
        try {
            File file = new File(filepath);// 要被压缩的文件夹
            File zipFile = new File(zipPath);
            InputStream input = null;
            ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipFile));
            if (file.isDirectory()) {
                File[] files = file.listFiles();
                for (int i = 0; i < files.length; ++i) {
                    input = new FileInputStream(files[i]);
                    zipOut.putNextEntry(new ZipEntry(file.getName() + File.separator + files[i].getName()));
                    int temp = 0;
                    while ((temp = input.read()) != -1) {
                        zipOut.write(temp);
                    }
                    input.close();
                }
            }
            zipOut.close();
        } catch (Exception e) {
            LOGGER.error("ZipMultiFile failed", e);
            return false;
        }
        return true;
    }
}
