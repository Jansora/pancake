package serve

import (
	"github.com/gin-gonic/gin"
)

func InitArticle(engine *gin.Engine) {
	engine.GET("/api/v2/Article/:id", func(c *gin.Context) {
		if a, err := FetchArticle(c.Param("id"), !ValidateLoginStatus(c)); err == nil {
			ReturnTrue(c, a)
			return
		}
		ReturnFalse(c, "")
	})

	engine.POST("/api/v2/Article", func(c *gin.Context) {
		if !ValidateLoginStatus(c) {
			ReturnFalse(c, FORBIDDEN)
			return
		}
		var j Article
		if c.BindJSON(&j) != nil {
			ReturnFalse(c, JsonError)
			return
		}

		if err := InsertArticle(&j); err != nil {
			ReturnFalse(c, err.Error())
			return
		}
		ReturnTrue(c, j)
	})
	engine.PUT("/api/v2/Article", func(c *gin.Context) {
		if !ValidateLoginStatus(c) {
			ReturnFalse(c, FORBIDDEN)
			return
		}
		var j Article

		if err := c.BindJSON(&j); err != nil {
			ReturnFalse(c, JsonError)
			return
		}

		if err := UpdateArticle(j); err != nil {
			ReturnFalse(c, err.Error())
			return

		}
		ReturnTrue(c, j)
		return

	})

	engine.DELETE("/api/v2/Article/:id", func(c *gin.Context) {
		if !ValidateLoginStatus(c) {
			ReturnFalse(c, FORBIDDEN)
			return
		}

		if err := DeleteArticle(c.Param("id")); err != nil {
			ReturnFalse(c, err.Error())
			return
		}
		ReturnTrue(c, "")
		return

	})

	engine.GET("/api/v2/Article", func(c *gin.Context) {

		var con Condition
		con.Init(c)
		enabled := !ValidateLoginStatus(c)
		if as, err := FetchArticles(con, enabled); err == nil {
			length, _ := FetchArticlesCount(con, enabled)
			ReturnTrue(c, map[string]interface{}{"total": length, "data": as})
			return
		}
		ReturnFalse(c, "")
	})

	engine.GET("/api/v2/tags", func(c *gin.Context) {

		classify := c.DefaultQuery("classify", "")

		if tags, err := FetchTags(classify, !ValidateLoginStatus(c)); err == nil {
			ReturnTrue(c, tags)
			return
		}
		ReturnFalse(c, "")

	})
	engine.GET("/api/v2/classifies", func(c *gin.Context) {

		if tags, err := FetchClassifies(!ValidateLoginStatus(c)); err == nil {
			ReturnTrue(c, tags)
			return
		}
		ReturnFalse(c, "")

	})
	engine.GET("/api/v2/logos", func(c *gin.Context) {

		if tags, err := FetchLogos(!ValidateLoginStatus(c)); err == nil {
			ReturnTrue(c, tags)
			return
		}
		ReturnFalse(c, "")

	})
}
