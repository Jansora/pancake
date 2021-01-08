package routers

import (
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
)

func InitAuth(r *gin.Engine) {
	Login(r)
}

func Login(r *gin.Engine) {

	r.POST("/Golang/Login", func(c *gin.Context) {
		var j LoginStruct
		if c.BindJSON(&j) != nil {
			ReturnFalse(c, JSON_ERROR)
			return
		}
		if ValidateLogin(j) {
			AddLoginCookie(c)
			ReturnTrue(c, tools.Conf.ADMIN)
			return
		}
		ReturnFalse(c, "登录失败")
		return
	})

	r.POST("/Golang/Logout", func(c *gin.Context) {

		RemoveLoginCookie(c)
		ReturnTrue(c, nil)
	})

	// 获取登录信息
	r.GET("/Golang/GetUserInfo", func(c *gin.Context) {
		if ValidateLoginStatus(c) {
			ReturnTrue(c, tools.Conf.ADMIN)
			return
		}
		ReturnFalse(c, "")
		return
	})

}
