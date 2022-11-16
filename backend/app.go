package main

import (
	"fmt"
	"github.com/Jansora/pancake/backend/store"
	"github.com/Jansora/pancake/backend/tools"
	"github.com/Jansora/pancake/backend/web/handler"
	"github.com/gin-gonic/gin"
)

func dbOp() {
	store.CreateArticleTable()
}

func main() {
	dbOp()

	r := gin.New()
	//gin.SetMode(gin.ReleaseMode)

	handler.InitAuth(r)
	handler.InitArticle(r)
	handler.InitUtils(r)

	port := fmt.Sprintf(":%d", tools.Conf.Server.Port)
	_ = r.Run(port) // listen and serve on 0.0.0.0:8080

}
