package web

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

var JSON_ERROR = "JSON 解析失败"
var FORBIDDEN = "没有访问权限"

func ReturnFalse(c *gin.Context, message string) {
	Return(c, false, nil, message)
}
func ReturnTrue(c *gin.Context, data interface{}) {
	Return(c, true, data, "")
}
func Return(c *gin.Context, status bool, data interface{}, message string) {
	c.JSON(http.StatusOK, gin.H{"status": status, "message": message, "data": data})
}
