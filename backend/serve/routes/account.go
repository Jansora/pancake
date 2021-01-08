package routes

import (
	"github.com/Jansora/pancake/backend/serve"
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
)

func InitAuth(r *gin.Engine) {
	Login(r)
}

func Login(r *gin.Engine) {

	r.POST("/api/v2/Login", func(c *gin.Context) {
		var j Account
		if c.BindJSON(&j) != nil {
			ReturnFalse(c, JSON_ERROR)
			return
		}
		if serve.ValidateLogin(j) {
			serve.AddLoginCookie(c)
			ReturnTrue(c, tools.Conf.Account)
			return
		}
		ReturnFalse(c, "登录失败")
	})

	r.POST("/api/v2/Logout", func(c *gin.Context) {
		serve.RemoveLoginCookie(c)
		ReturnTrue(c, nil)
	})

	// 获取登录信息
	r.GET("/api/v2/GetUserInfo", func(c *gin.Context) {
		if serve.ValidateLoginStatus(c) {
			ReturnTrue(c, tools.Conf.Account)
			return
		}
		ReturnFalse(c, "")
		return
	})

}
