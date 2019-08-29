package routers

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
	pg "web/postgres"
	"web/postgres/account"
)


func InitAuth(r *gin.Engine)  {
	Login(r)
}

func Login(r *gin.Engine)  {

	r.POST("/Golang/Login", func(c *gin.Context) {
		var j LoginType
		if c.BindJSON(&j) == nil {

			u := account.Login(
				pg.Client, account.Account{Name:j.UserName, Password:j.PassWord})

			if u.Id > 0 && u.Admin{
				SetLoginCookie(c, u)
				c.JSON(http.StatusOK, gin.H{
					"status":  "ok",
					"currentAuthority": "admin",
					"ret": true,
					"loginId": u.Id,
					"loginUser": u.Name,
					"loginToken": u.Password,
				})
				log.Println("/Login" + "-----  success -----")
			} else {
				log.Println("/Login" + "-----  account not found -----")
				Ret(c, false, "")
			}
		} else {
			log.Println("/Login" + "-----  Decode json error -----")
			Ret(c, false, "")
		}
	})
	r.POST("/Golang/Login/Check", func(c *gin.Context) {

		IdString, err := c.Cookie("Id")
		if err != nil{
			log.Println("/Login/Check" + "-----  get Cookie Id error -----")
			Ret(c, false, "")
			return
		}
		Id, err := strconv.Atoi(IdString);
		if err != nil{
			log.Println("/Login/Check" + "-----   Cookie to Int error -----")
			Ret(c, false, "")
			return
		}
		token, err := c.Cookie("token")
		if err != nil{
			log.Println("/Login/Check" + "-----  get Cookie token error -----")
			Ret(c, false, "")
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"ret":  account.CheckLoginStatus(
				pg.Client, account.Account{Id: Id, Password: token}),
		})
	})

}

func LoginStatus(c *gin.Context)(bool){
	return account.CheckLoginStatus(pg.Client, GetLoginCookie(c))
}

