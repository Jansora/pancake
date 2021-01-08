package routers

import (
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
)

func SetLoginCookie(c *gin.Context) {
	c.SetCookie("name", tools.Conf.ADMIN.Name, 36000000, "/", "", false, true)
	c.SetCookie("token", tools.Conf.ADMIN.Token, 36000000, "/", "", false, true)
}

func GetLoginCookie(c *gin.Context) tools.Admin {

	Name, err := c.Cookie("name")
	if err != nil {
		return tools.Admin{}
	}
	Token, err := c.Cookie("token")
	if err != nil {
		return tools.Admin{}
	}
	return tools.Admin{Name: Name, Token: Token}
}

func ValidateLoginStatus(c *gin.Context) bool {
	admin := GetLoginCookie(c)
	return admin.Name == tools.Conf.ADMIN.Name && admin.Token == tools.Conf.ADMIN.Token
}

func ValidateLogin(j LoginStruct) bool {
	return j.Name == tools.Conf.ADMIN.Name && j.Token == tools.Conf.ADMIN.Token
}
