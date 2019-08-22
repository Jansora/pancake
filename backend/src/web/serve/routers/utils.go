package routers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Ret(c *gin.Context, ret bool, res interface{})  {
	c.JSON(http.StatusOK, gin.H{"ret": ret, "res": res})
}


