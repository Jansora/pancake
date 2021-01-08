package tools

import (
	"fmt"
	"github.com/BurntSushi/toml"
	"github.com/Jansora/pancake/backend"
)

type Postgres struct {
	ConnectString string
	Password      string
	Host          string
	Port          int
	DataBase      string
	SSLmode       string
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
	PG   Postgres
	User main.User

	STORAGE Storage
}

func (c Config) String() string {
	return c.PG.ConnectString
}

func GetConfiguration() Config {
	var conf Config
	if _, err := toml.DecodeFile(confPath, &conf); err != nil {
		fmt.Print("read conf error !", err)
	}
	return conf
}

var Conf = GetConfiguration()
