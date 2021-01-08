package serve

import (
	"github.com/Jansora/pancake/backend"
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
)

func InitAuth(r *gin.Engine) {
	Login(r)
}

func Login(r *gin.Engine) {

	r.POST("/api/v2/Login", func(c *gin.Context) {
		var j User
		if c.BindJSON(&j) != nil {
			main.ReturnFalse(c, JSON_ERROR)
			return
		}
		if ValidateLogin(j) {
			AddLoginCookie(c)
			main.ReturnTrue(c, tools.Conf.ADMIN)
			return
		}
		main.ReturnFalse(c, "登录失败")
	})

	r.POST("/api/v2/Logout", func(c *gin.Context) {
		RemoveLoginCookie(c)
		main.ReturnTrue(c, nil)
	})

	// 获取登录信息
	r.GET("/api/v2/GetUserInfo", func(c *gin.Context) {
		if ValidateLoginStatus(c) {
			main.ReturnTrue(c, tools.Conf.ADMIN)
			return
		}
		main.ReturnFalse(c, "")
		return
	})

}
