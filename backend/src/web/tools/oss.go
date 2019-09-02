package tools

import (
	"fmt"
	"github.com/aliyun/aliyun-oss-go-sdk/oss"
	"io"
	"os"
)



func client() *oss.Client {

	client, err := oss.New(Conf.OSS.EndPoint, Conf.OSS.AccessKeyId, Conf.OSS.AccessKeySecret)
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(-1)
	}
	return client
}

func bucket(client *oss.Client) *oss.Bucket {

	// 获取存储空间。
	bucket, err := client.Bucket(Conf.OSS.Bucket)
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(-1)
	}
	return bucket
}

func Upload(bucket *oss.Bucket, fp io.Reader, objectName string, ) string {


	// 上传文件流。
	err := bucket.PutObject(objectName, fp)
	if err != nil {
		fmt.Println("Error:", err)
		return ""
	}
	return Conf.OSS.AliasDomain + objectName
}

var Client = client()

var Bucket = bucket(Client)