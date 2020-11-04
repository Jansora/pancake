package routers

import (
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Ret(c *gin.Context, ret bool, res interface{}) {
	c.JSON(http.StatusOK, gin.H{"ret": ret, "res": res})
}

func InitUtils(r *gin.Engine) {
	Utils(r)
}

func Utils(r *gin.Engine) {

	r.POST("/Golang/Upload", func(c *gin.Context) {

		file, _ := c.FormFile("file")

		src, _ := file.Open()

		r := tools.Upload(src, file.Filename)

		if len(r) > 0 {

			Ret(c, true, r)

		} else {

			Ret(c, false, "")
		}

	})

}
