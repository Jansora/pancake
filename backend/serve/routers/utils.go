package routers

import (
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
	"net/http"
)

func ReturnFalse(c *gin.Context, message string) {
	Return(c, true, nil, message)
	return
}
func ReturnTrue(c *gin.Context, data interface{}) {
	Return(c, true, data, "")
	return
}
func Return(c *gin.Context, status bool, data interface{}, message string) {
	c.JSON(http.StatusOK, gin.H{"status": status, "message": message, "data": data})
	return
}

func InitUtils(r *gin.Engine) {
	Utils(r)
}

func Utils(r *gin.Engine) {

	r.POST("/api/v2/Upload", func(c *gin.Context) {

		file, _ := c.FormFile("file")

		src, _ := file.Open()

		result := tools.Upload(src, file.Filename)

		if len(result) > 0 {
			ReturnTrue(c, result)
			return
		}

		ReturnFalse(c, "")
		return

	})

}
