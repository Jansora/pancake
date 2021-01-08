package serve

import (
	"github.com/Jansora/pancake/backend/serve/routes"
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
)

func AddLoginCookie(c *gin.Context) {
	c.SetCookie("name", tools.Conf.Account.Name, 36000000, "/", "", false, true)
	c.SetCookie("token", tools.Conf.Account.Token, 36000000, "/", "", false, true)
}
func RemoveLoginCookie(c *gin.Context) {
	c.SetCookie("name", "", 36000000, "/", "", false, true)
	c.SetCookie("token", "", 36000000, "/", "", false, true)
}

func getLoginCookie(c *gin.Context) routes.Account {

	a := routes.Account{}
	Name, err := c.Cookie("name")
	if err != nil {
		return a
	}
	Token, err := c.Cookie("token")
	if err != nil {
		return a
	}
	a.Name = Name
	a.Token = Token
	return a
}

func ValidateLoginStatus(c *gin.Context) bool {
	admin := getLoginCookie(c)
	return admin.Name == tools.Conf.Account.Name && admin.Token == tools.Conf.Account.Token
}

func ValidateLogin(j routes.Account) bool {
	return j.Name == tools.Conf.Account.Name && j.Token == tools.Conf.Account.Token
}
