package routers

import (
	"github.com/gin-gonic/gin"
)

func Init(r *gin.Engine) {

	InitAuth(r)
	InitArticle(r)
	InitUtils(r)
}
