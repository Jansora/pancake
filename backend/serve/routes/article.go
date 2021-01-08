package routes

import (
	"github.com/Jansora/pancake/backend/serve"
	"github.com/gin-gonic/gin"
)


func InitArticle(r *gin.Engine) {
	r.GET("/api/v2/Article/:id", func(c *gin.Context) {
		if a, err := serve.FetchArticle( c.Param("id"), !serve.ValidateLoginStatus(c)); err == nil {
			ReturnTrue(c, a)
			return
		}
		ReturnFalse(c, "")
	})

	r.POST("/api/v2/Article", func(c *gin.Context) {
		if !serve.ValidateLoginStatus(c) {
			return
		}
		var j Article
		if c.BindJSON(&j) != nil {
			ReturnFalse(c, JSON_ERROR)
			return
		}

		if err := serve.InsertArticle( j); err != nil {
			ReturnFalse(c, err.Error())
			return
		}
		ReturnTrue(c, j)
	})
	r.PUT("/api/v2/Article", func(c *gin.Context) {
		if !serve.ValidateLoginStatus(c) {
			ReturnFalse(c, FORBIDDEN)
			return
		}
		var j Article

		if err := c.BindJSON(&j); err != nil {
			ReturnFalse(c, JSON_ERROR)
			return
		}

		if err := serve.UpdateArticle(j); err != nil {
			ReturnFalse(c, "")
			return

		}
		ReturnTrue(c, j)
		return

	})

	r.DELETE("/api/v2/Article/:id", func(c *gin.Context) {
		if !serve.ValidateLoginStatus(c) {
			ReturnFalse(c, FORBIDDEN)
			return
		}

		if err := serve.DeleteArticle( c.Param("id")); err != nil {
			ReturnTrue(c, "")
			return
		}
		ReturnFalse(c, FORBIDDEN)
		return

	})

	r.GET("/api/v2/Article", func(c *gin.Context) {

		var con Condition
		con.Init(c)
		enabled := !serve.ValidateLoginStatus(c)
		if as, err := serve.FetchArticles( con, enabled); err == nil {
			length, _ := serve.FetchArticlesCount( con, enabled)
			ReturnTrue(c, map[string]interface{}{"total": length, "data": as})
			return
		}
		ReturnFalse(c, "")
	})


	r.GET("/api/v2/Tag", func(c *gin.Context) {

		if tags, err := serve.FetchTags(!serve.ValidateLoginStatus(c)); err == nil {
			ReturnTrue(c, tags)
			return
		}
		ReturnFalse(c, "")

	})
}

