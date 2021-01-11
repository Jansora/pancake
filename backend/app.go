package main

import (
	"fmt"
	"github.com/Jansora/pancake/backend/serve"
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
)



func dbOp()  {
	serve.CreateTable()
}

func main() {
	dbOp()

	r := gin.New()
	//gin.SetMode(gin.ReleaseMode)

	serve.InitAuth(r)
	serve.InitArticle(r)
	serve.InitUtils(r)

	port := fmt.Sprintf(":%d", tools.Conf.Server.Port)
	_ = r.Run(port) // listen and serve on 0.0.0.0:8080

}
