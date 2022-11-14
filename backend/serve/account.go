package serve

import (
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
)

func InitAuth(r *gin.Engine) {

	r.POST("/api/v2/login", func(c *gin.Context) {
		var j tools.Account
		if c.BindJSON(&j) != nil {
			ReturnFalse(c, JSON_ERROR)
		} else if ValidateLogin(j) {
			AddLoginCookie(c)
			ReturnTrue(c, tools.Conf.Account)
		} else {
			ReturnFalse(c, "登录失败")
		}

	})

	r.POST("/api/v2/logout", func(c *gin.Context) {
		RemoveLoginCookie(c)
		ReturnTrue(c, nil)
	})

	// 获取登录信息
	r.GET("/api/v2/fetchCurrentUser", func(c *gin.Context) {
		if ValidateLoginStatus(c) {
			ReturnTrue(c, tools.Conf.Account)
			return
		}
		ReturnFalse(c, "")
		return
	})

}
