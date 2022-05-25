package tools

import (
	"fmt"
	"github.com/BurntSushi/toml"
)

type Server struct {
	Port int
}

type Mysql struct {
	ConnectString string
}

type Storage struct {
	UseOss          bool
	EndPoint        string
	AccessKeyId     string
	AccessKeySecret string
	Bucket          string
	AliasDomain     string

	OssPrefix         string
	LocalSavePrefix   string
	LocalReturnPrefix string
}

type Config struct {
	Mysql   Mysql
	Account Account
	Storage Storage
	Server  Server
}

func GetConfiguration() Config {
	var conf Config
	if _, err := toml.DecodeFile(confPath, &conf); err != nil {
		fmt.Print("read conf error !", err)
	}
	return conf
}

var Conf = GetConfiguration()

type Account struct {
	Name  string `json:"name"`
	Alias string `json:"alias"`
	Token string `json:"token"`
}
