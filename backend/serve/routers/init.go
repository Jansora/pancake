package routers

import (
	"github.com/gin-gonic/gin"
)

func Init(r *gin.Engine) {

	InitAuth(r)
	InitArticle(r)
	InitTopic(r)
	InitProject(r)

	InitUtils(r)
}
