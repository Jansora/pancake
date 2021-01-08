package serve

import (
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
)

func AddLoginCookie(c *gin.Context) {
	c.SetCookie("name", tools.Conf.ADMIN.Name, 36000000, "/", "", false, true)
	c.SetCookie("token", tools.Conf.ADMIN.Token, 36000000, "/", "", false, true)
}
func RemoveLoginCookie(c *gin.Context) {
	c.SetCookie("name", "", 36000000, "/", "", false, true)
	c.SetCookie("token", "", 36000000, "/", "", false, true)
}

func getLoginCookie(c *gin.Context) tools.User {

	Name, err := c.Cookie("name")
	if err != nil {
		return tools.User{}
	}
	Token, err := c.Cookie("token")
	if err != nil {
		return tools.User{}
	}
	return tools.User{Name: Name, Token: Token}
}

func ValidateLoginStatus(c *gin.Context) bool {
	admin := getLoginCookie(c)
	return admin.Name == tools.Conf.ADMIN.Name && admin.Token == tools.Conf.ADMIN.Token
}

func ValidateLogin(j LoginStruct) bool {
	return j.Name == tools.Conf.ADMIN.Name && j.Token == tools.Conf.ADMIN.Token
}
