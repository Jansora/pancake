package serve

import (
	"github.com/gin-gonic/gin"
	"web/serve/routers"
)

func App () {
	//gin.SetMode(gin.ReleaseMode)

	r := gin.New()

	//f, _ := os.Create("/var/log/gin/access.log")
	//
	//
	//gin.DefaultWriter = io.MultiWriter(f)
	//
	//r.Use(gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
	//
	//	return fmt.Sprintf("ACCESS %s %s %s \"%s\" %s %d  %s %s\n",
	//		param.TimeStamp.Format("2006-01-02 15:04:05"),
	//		param.Latency,
	//		param.ClientIP,
	//		param.Request.UserAgent(),
	//		param.Request.Proto,
	//		param.StatusCode,
	//		param.Method,
	//		param.Path,
	//	)
	//}))
	//r.Use(gin.Recovery())
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	routers.Init(r)

	r.Run() // listen and serve on 0.0.0.0:8080
}

