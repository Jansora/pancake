package handler

import (
	"github.com/Jansora/pancake/backend/tools"
	"github.com/Jansora/pancake/backend/web"
	"github.com/gin-gonic/gin"
)

func InitAuth(r *gin.Engine) {

	r.POST("/api/v2/login", func(c *gin.Context) {
		var j tools.Account
		if c.BindJSON(&j) != nil {
			web.ReturnFalse(c, web.JSON_ERROR)
		} else if web.ValidateLogin(j) {
			web.AddLoginCookie(c)
			web.ReturnTrue(c, tools.Conf.Account)
		} else {
			web.ReturnFalse(c, "登录失败")
		}

	})

	r.POST("/api/v2/logout", func(c *gin.Context) {
		web.RemoveLoginCookie(c)
		web.ReturnTrue(c, nil)
	})

	// 获取登录信息
	r.GET("/api/v2/fetchCurrentUser", func(c *gin.Context) {
		if web.ValidateLoginStatus(c) {
			web.ReturnTrue(c, tools.Conf.Account)
			return
		}
		web.ReturnFalse(c, "")
		return
	})

}
