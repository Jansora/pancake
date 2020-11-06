package routers

import (
	"fmt"
	"github.com/Jansora/pancake/backend/postgres/account"
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
	"strconv"
)

func SetLoginCookie(c *gin.Context, account account.Account) {
	c.SetCookie("Id", fmt.Sprintf("%d", account.Id), 36000000, "/", tools.Conf.DOMAIN.AppDomain, false, true)
	c.SetCookie("token", account.Password, 36000000, "/", tools.Conf.DOMAIN.AppDomain, false, true)
	c.SetCookie("Id", fmt.Sprintf("%d", account.Id), 36000000, "/", tools.Conf.DOMAIN.AdminDOmain, false, true)
	c.SetCookie("token", account.Password, 36000000, "/", tools.Conf.DOMAIN.AdminDOmain, false, true)
}

func GetLoginCookie(c *gin.Context) account.Account {

	IdString, err := c.Cookie("Id")
	if err != nil {
		return account.Account{}
	}
	Id, err := strconv.Atoi(IdString)
	if err != nil {
		return account.Account{}
	}
	token, err := c.Cookie("token")
	if err != nil {
		return account.Account{}
	}
	return account.Account{Id: Id, Password: token}
}
