package tools

import (
	"fmt"
	"github.com/aliyun/aliyun-oss-go-sdk/oss"
	"io"
	"log"
	"os"
	"time"
)

func Client() *oss.Client {

	client, err := oss.New(Conf.STORAGE.EndPoint, Conf.STORAGE.AccessKeyId, Conf.STORAGE.AccessKeySecret)
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(-1)
	}
	return client
}

func Bucket(client *oss.Client) *oss.Bucket {

	// 获取存储空间。
	bucket, err := client.Bucket(Conf.STORAGE.Bucket)
	if err != nil {
		fmt.Println("Error:1", err)
		os.Exit(-1)
	}
	return bucket
}

func uploadToOSS(fp io.Reader, objectName string) string {
	bucket := Bucket(Client())
	ossPath := Conf.STORAGE.OssPrefix + time.Now().Format("2006-01-02") + "/" + objectName

	err := bucket.PutObject(ossPath, fp)
	if err != nil {
		fmt.Println("Error:2", err)
		return ""
	}
	return Conf.STORAGE.AliasDomain + "/" + ossPath
}

func saveToLocal(fp io.Reader, objectName string) string {
	objectName = time.Now().Format("2006-01-02") + "_" + objectName
	localPath := Conf.STORAGE.LocalSavePrefix + objectName
	f, err := os.Create(localPath)
	if err != nil {
		fmt.Println(err)
		return "创建文件失败"
	}
	defer f.Close()

	_, err = io.Copy(f, fp)
	if err != nil {
		log.Fatal(err)
		return "写文件失败"
	}

	return Conf.STORAGE.LocalReturnPrefix + "/" + objectName

}

func Upload(fp io.Reader, objectName string) string {

	// 上传文件流。
	if Conf.STORAGE.UseOss {
		return uploadToOSS(fp, objectName)
	} else {
		return saveToLocal(fp, objectName)
	}

}
