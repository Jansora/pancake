package main

import (
	"fmt"
	"github.com/Jansora/pancake/backend/serve"
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


func dbOp()  {
	CreateTable(Client)
}

func main() {
	dbOp()

	r := gin.New()
	gin.SetMode(gin.ReleaseMode)

	serve.InitAuth(r)
	serve.InitArticle(r)
	serve.InitUtils(r)

	port := fmt.Sprintf(":%d", tools.Port)
	_ = r.Run(port) // listen and serve on 0.0.0.0:8080

}
