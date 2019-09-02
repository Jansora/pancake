package routers

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"web/tools"
)

func Ret(c *gin.Context, ret bool, res interface{})  {
	c.JSON(http.StatusOK, gin.H{"ret": ret, "res": res})
}

func InitUtils(r *gin.Engine)  {
	Utils(r)
}

func Utils(r *gin.Engine)  {

	r.POST("/Golang/Upload", func(c *gin.Context) {
		var j LoginType
		if c.BindJSON(&j) == nil {

			file, _, _ := c.Request.FormFile("file")

			r := tools.Upload(tools.Bucket, file, "")

			if len(r) > 0{

				Ret(c, true, r)

			} else {

				Ret(c, false, "")
			}
		} else {
			log.Println("/Login" + "-----  Decode json error -----")
			Ret(c, false, "")
		}
	})


}