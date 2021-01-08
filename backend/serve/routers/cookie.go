package routers

import (
	"fmt"
	"github.com/Jansora/pancake/backend/postgres/account"
	"github.com/gin-gonic/gin"
	"strconv"
)

func SetLoginCookie(c *gin.Context, account account.Account) {
	c.SetCookie("id", fmt.Sprintf("%d", account.Id), 36000000, "/", "", false, true)
	c.SetCookie("token", account.Password, 36000000, "/", "", false, true)
}

func GetLoginCookie(c *gin.Context) account.Account {

	IdString, err := c.Cookie("id")
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
