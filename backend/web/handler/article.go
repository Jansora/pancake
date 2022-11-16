package handler

import (
	"github.com/Jansora/pancake/backend/store"
	"github.com/Jansora/pancake/backend/store/model"
	"github.com/Jansora/pancake/backend/web"
	"github.com/gin-gonic/gin"
)

func InitArticle(r *gin.Engine) {
	r.GET("/api/v2/Article/:id", func(c *gin.Context) {
		if a, err := store.FetchArticle(c.Param("id"), !web.ValidateLoginStatus(c)); err == nil {
			web.ReturnTrue(c, a)
			return
		}
		web.ReturnFalse(c, "")
	})

	r.POST("/api/v2/Article", func(c *gin.Context) {
		if !web.ValidateLoginStatus(c) {
			web.ReturnFalse(c, web.FORBIDDEN)
			return
		}
		var j model.Article
		if c.BindJSON(&j) != nil {
			web.ReturnFalse(c, web.JSON_ERROR)
			return
		}

		if err := store.InsertArticle(&j); err != nil {
			web.ReturnFalse(c, err.Error())
			return
		}
		web.ReturnTrue(c, j)
	})
	r.PUT("/api/v2/Article", func(c *gin.Context) {
		if !web.ValidateLoginStatus(c) {
			web.ReturnFalse(c, web.FORBIDDEN)
			return
		}
		var j model.Article

		if err := c.BindJSON(&j); err != nil {
			web.ReturnFalse(c, web.JSON_ERROR)
			return
		}

		if err := store.UpdateArticle(j); err != nil {
			web.ReturnFalse(c, err.Error())
			return

		}
		web.ReturnTrue(c, j)
		return

	})

	r.DELETE("/api/v2/Article/:id", func(c *gin.Context) {
		if !web.ValidateLoginStatus(c) {
			web.ReturnFalse(c, web.FORBIDDEN)
			return
		}

		if err := store.DeleteArticle(c.Param("id")); err != nil {
			web.ReturnFalse(c, err.Error())
			return
		}
		web.ReturnTrue(c, "")
		return

	})

	r.GET("/api/v2/Article", func(c *gin.Context) {

		con := model.ConditionOf(c)

		enabled := !web.ValidateLoginStatus(c)
		if as, err := store.FetchArticles(con, enabled); err == nil {
			length, _ := store.FetchArticlesCount(con, enabled)
			web.ReturnTrue(c, map[string]interface{}{"total": length, "data": as})
			return
		}
		web.ReturnFalse(c, "")
	})

	r.GET("/api/v2/tags", func(c *gin.Context) {

		classify := c.DefaultQuery("classify", "")

		if tags, err := store.FetchTags(classify, !web.ValidateLoginStatus(c)); err == nil {
			web.ReturnTrue(c, tags)
			return
		}
		web.ReturnFalse(c, "")

	})
	r.GET("/api/v2/classifies", func(c *gin.Context) {

		if tags, err := store.FetchClassifies(!web.ValidateLoginStatus(c)); err == nil {
			web.ReturnTrue(c, tags)
			return
		}
		web.ReturnFalse(c, "")

	})
	r.GET("/api/v2/logos", func(c *gin.Context) {

		if tags, err := store.FetchLogos(!web.ValidateLoginStatus(c)); err == nil {
			web.ReturnTrue(c, tags)
			return
		}
		web.ReturnFalse(c, "")

	})
}
