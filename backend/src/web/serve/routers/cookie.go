package routers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"strconv"
	"web/postgres/account"
	"web/tools"
)


func SetLoginCookie(c *gin.Context, account account.Account) {
	c.SetCookie("Id", fmt.Sprintf("%d", account.Id), 36000000, "/", "jansora.com", false, true)
	c.SetCookie("token", account.Password, 36000000, "/", "jansora.com", false, true)
	c.SetCookie("Id", fmt.Sprintf("%d", account.Id), 36000000, "/", "localhost", false, true)
	c.SetCookie("token", account.Password, 36000000, "/", "localhost", false, true)
}

func GetLoginCookie(c *gin.Context)  (account.Account) {

	IdString, err := c.Cookie("Id")
	if err != nil{
		return account.Account{}
	}
	Id, err := strconv.Atoi(IdString);
	if err != nil{
		return account.Account{}
	}
	token, err := c.Cookie("token")
	if err != nil{
		return account.Account{}
	}
	return account.Account{Id: Id, Password: token}
}

func SetOauthCookie(c *gin.Context, oauthType string,  oauthId int, oauthToken string) {
	c.SetCookie("oauthType", oauthType, 36000000, "/", tools.Conf.DOMAIN.MainDomain, true, true)
	c.SetCookie("oauthId", fmt.Sprintf("%d", oauthId), 36000000, "/", tools.Conf.DOMAIN.MainDomain, true, true)
	c.SetCookie("oauthToken", oauthToken, 36000000, "/", tools.Conf.DOMAIN.MainDomain, true, true)

	// debug
	c.SetCookie("oauthType", oauthType, 36000000, "/", "localhost", true, true)
	c.SetCookie("oauthId", fmt.Sprintf("%d", oauthId), 36000000, "/", "localhost", true, true)
	c.SetCookie("oauthToken", oauthToken, 36000000, "/", "localhost", true, true)
}

func GetOauthCookie(c *gin.Context) (account.Account){

	OriginIdString, err := c.Cookie("oauthId")
	if err != nil{
		return account.Account{}
	}

	OriginId, err := strconv.Atoi(OriginIdString);
	if err != nil{
		return account.Account{}
	}
	Password, err := c.Cookie("oauthToken")
	if err != nil{
		return account.Account{}
	}
	return account.Account{ OriginId:OriginId, Password: Password}
}
