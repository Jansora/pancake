package main

import (
	"fmt"
	"github.com/Jansora/pancake/backend/serve"
	"github.com/Jansora/pancake/backend/serve/routes"
	"github.com/Jansora/pancake/backend/tools"
	"github.com/gin-gonic/gin"
	"net/http"
)



func dbOp()  {
	serve.CreateTable(serve.Client)
}

func main() {
	dbOp()

	r := gin.New()
	gin.SetMode(gin.ReleaseMode)

	routes.InitAuth(r)
	routes.InitArticle(r)
	routes.InitUtils(r)

	port := fmt.Sprintf(":%d", tools.Port)
	_ = r.Run(port) // listen and serve on 0.0.0.0:8080

}
