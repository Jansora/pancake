package tools

import (
	"fmt"
	"github.com/BurntSushi/toml"
)

type Server struct {
	Port int
}

type Postgres struct {
	User     string
	Password string
	Host     string
	Port     int
	DataBase string
	SSLmode  string
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
	Postgres Postgres
	Account  Account
	Storage  Storage
	Server   Server
}

func (p Postgres) Connect() string {
	return fmt.Sprintf(`postgres://%s:%s@%s:%d/%s?sslmode=%s`,
		p.User, p.Password, p.Host, p.Port, p.DataBase, p.SSLmode)
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
