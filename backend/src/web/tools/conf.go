package tools

import (
	"fmt"
	"github.com/BurntSushi/toml"
)

type Postgres struct {
	User string
	Password string
	Host string
	Port int
	DataBase string
	SSLmode string
}

type Admin struct {
	Name   string
	Password string
	Website string
	Email string
	Admin bool
}

type Oauth struct {
	GITHUB   Github
}

type Github struct {
	ClientId string
	ClientSecret string
}
type Domain struct {
	MainDomain string
	AdminDomain string
}

type Oss struct {
	EndPoint string
	AccessKeyId string
	AccessKeySecret string
	Bucket string
	AliasDomain string
}


func (p Postgres) Connect() string {
	return fmt.Sprintf(`postgres://%s:%s@%s:%d/%s?sslmode=%s`,
		p.User, p.Password, p.Host, p.Port, p.DataBase, p.SSLmode)
}

type Config struct {
	PG Postgres
	ADMIN Admin
	GITHUB Github
	DOMAIN Domain
	OSS Oss
}

func (c Config) String() string {
	return c.PG.Connect()
}



func GetConf() Config {
	var conf Config
	if _, err := toml.DecodeFile("/etc/conf.toml", &conf); err != nil {
		// handle error
		fmt.Print("read conf error !", err)
	}
	//fmt.Print(conf)
	return conf
}

var Conf = GetConf()
