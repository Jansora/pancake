package routers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"strconv"
	"web/postgres/account"
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
