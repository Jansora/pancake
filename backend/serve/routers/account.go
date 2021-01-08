package routers

import (
	pg "github.com/Jansora/pancake/backend/postgres"
	"github.com/Jansora/pancake/backend/postgres/account"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
)

func InitAuth(r *gin.Engine) {
	Login(r)
}

func Login(r *gin.Engine) {

	r.POST("/Golang/Login", func(c *gin.Context) {
		var j LoginType
		if c.BindJSON(&j) == nil {

			u := account.Login(
				pg.Client, account.Account{Name: j.UserName, Password: j.PassWord})

			authority := "guest"
			if u.Id > 0 {
				if u.Admin {
					authority = "admin"
				}
				SetLoginCookie(c, u)
				c.JSON(http.StatusOK, gin.H{
					"ret":              true,
					"currentAuthority": authority,
					"id":               u.Id,
					"name":             u.Name,
				})
			} else {
				log.Println("/Login" + "-----  account not found -----")
				Ret(c, false, "")
			}
		} else {
			log.Println("/Login" + "-----  Decode json error -----")
			Ret(c, false, "数据格式错误")
		}
	})

	r.POST("/Golang/Logout", func(c *gin.Context) {
		authority := "guest"
		SetLoginCookie(c, account.Account{})
		c.JSON(http.StatusOK, gin.H{
			"currentAuthority": authority,
			"ret":              true,
		})
	})

	// 获取登录信息
	r.GET("/Golang/GetUserInfo", func(c *gin.Context) {

		IdString, err := c.Cookie("Id")
		if err != nil {
			Ret(c, false, "无Cookie信息，请重新登陆")
			return
		}
		Id, err := strconv.Atoi(IdString)
		if err != nil {
			log.Println("/Login/Check" + "-----   Cookie to Int error -----")
			Ret(c, false, "Cookie无效，请重新登陆")
			return
		}
		token, err := c.Cookie("token")
		if err != nil {
			log.Println("/Login/Check" + "-----  get Cookie token error -----")
			Ret(c, false, "令牌无效，请重新登陆")
			return
		}
		u := account.GetUserInfo(
			pg.Client, account.Account{Id: Id, Password: token})

		authority := "guest"
		if u.Id > 0 {
			if u.Admin {
				authority = "admin"
			}
			c.JSON(http.StatusOK, gin.H{
				"ret":              true,
				"currentAuthority": authority,
				"id":               u.Id,
				"name":             u.Name,
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"ret":              false,
				"currentAuthority": authority,
			})
		}
	})

}

func LoginStatus(c *gin.Context) bool {
	return account.CheckLoginStatus(pg.Client, GetLoginCookie(c))
}
