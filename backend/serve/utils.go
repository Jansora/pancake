package serve

import (
	"github.com/Jansora/pancake/backend"
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
)


func InitUtils(r *gin.Engine) {
	Utils(r)
}

func Utils(r *gin.Engine) {

	r.POST("/api/v2/Upload", func(c *gin.Context) {
		file, _ := c.FormFile("file")
		src, _ := file.Open()
		result := tools.Upload(src, file.Filename)

		if len(result) > 0 {
			main.ReturnTrue(c, result)
			return
		}

		main.ReturnFalse(c, "")
	})

}
