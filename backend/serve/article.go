package serve

import (
	"github.com/Jansora/pancake/backend"
	"github.com/Jansora/pancake/backend/postgres/article"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"time"
)

func InitArticle(r *gin.Engine) {
	Article(r)
	GetTagList(r)
}

func Article(r *gin.Engine) {
	r.GET("/api/v2/Article/:id", func(c *gin.Context) {
		if a, err := article.Select(main.Client, c.Param("id"), !ValidateLoginStatus(c)); err == nil {
			main.ReturnTrue(c, a)
			return
		}
		main.ReturnFalse(c, "")
	})

	r.POST("/api/v2/Article", func(c *gin.Context) {
		if !ValidateLoginStatus(c) {
			return
		}
		var j InsertArticleType
		if c.BindJSON(&j) != nil {
			main.ReturnFalse(c, JSON_ERROR)
			return
		}
		a := main.Article{
			Author:      j.Author,
			CreateAt:    time.Now(),
			UpdateAt:    time.Now(),
			Site:        j.Site,
			ReadNum:     0,
			LikeNum:     0,
			Tag:         j.Tags,
			Url:         j.Url,
			Enabled:     j.IsPublic,
			Logo:        j.LogoUrl,
			Title:       j.Title,
			Description: j.Summary,
			Raw:         j.Content,
			Html:        j.Html,
		}
		if err := article.Insert(main.Client, a); err != nil {
			c.JSON(http.StatusOK, gin.H{
				"ret": false, "res": "参数不能为空！" + err.Error(),
			})
			return
		}
		println(a.Title)
		c.JSON(http.StatusOK, gin.H{
			"ret": true, "res": "文章发表成功！",
		})
	})
	r.POST("/api/v2/Article/UpdateDoc/:Url", func(c *gin.Context) {
		var j InsertArticleType

		if err := c.BindJSON(&j); err != nil {
			c.JSON(http.StatusOK, gin.H{
				"ret": false,
				"res": "Decode json error！" + err.Error(),
			})
			return
		}
		if !ValidateLoginStatus(c) {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "没有操作权限"})
			return
		}
		if a, err := article.Select(main.Client, c.Param("Url"), false); err == nil {
			a.Raw = j.Content
			if err := article.Update(main.Client, a, c.Param("Url")); err != nil {
				c.JSON(http.StatusOK, gin.H{
					"ret": false, "res": "更新失敗！" + err.Error(),
				})
				return
			}
			c.JSON(http.StatusOK, gin.H{
				"ret": true, "res": "文章正文更新成功！",
			})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Article信息失败！" + err.Error()})
		}
		return

	})

	r.POST("/api/v2/Article/Update/:Url", func(c *gin.Context) {
		var j InsertArticleType
		if err := c.BindJSON(&j); err != nil {
			c.JSON(http.StatusOK, gin.H{
				"ret": false,
				"res": "Decode json error！" + err.Error(),
			})
			return
		}
		if !ValidateLoginStatus(c) {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "没有操作权限"})
			return
		}

		if a, err := article.Select(main.Client, c.Param("Url"), false); err == nil {
			a.Title = j.Title
			a.Url = j.Url
			a.Author = j.Author
			a.UpdateAt = time.Now()
			a.Site = j.Site
			a.Tag = j.Tags
			a.Enabled = j.IsPublic
			a.Logo = j.LogoUrl
			a.Description = j.Summary
			a.Raw = j.Content
			a.Html = j.Html
			if err := article.Update(main.Client, a, c.Param("Url")); err != nil {
				c.JSON(http.StatusOK, gin.H{
					"ret": false, "res": "更新失敗！" + err.Error(),
				})
				return
			}
			c.JSON(http.StatusOK, gin.H{
				"ret": true, "res": "文章更新成功！",
			})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Article信息失败！" + err.Error()})
		}
		return

	})

	r.POST("/api/v2/Article/UpdateLike/:Url", func(c *gin.Context) {
		if a, err := article.Select(main.Client, c.Param("Url"), !ValidateLoginStatus(c)); err == nil {
			a.LikeNum += 1
			if err := article.Update(main.Client, a, c.Param("Url")); err != nil {
				c.JSON(http.StatusOK, gin.H{
					"ret": false, "res": "更新失敗！" + err.Error(),
				})
				return
			}
			c.JSON(http.StatusOK, gin.H{
				"ret": true, "res": "Like更新成功！",
			})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Article信息失败！" + err.Error()})
		}
		return

	})

	r.DELETE("/api/v2/Article/:Url", func(c *gin.Context) {
		if !ValidateLoginStatus(c) {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "没有操作权限"})
			return
		}
		if _, err := article.Delete(main.Client, c.Param("Url")); err == nil {
			c.JSON(http.StatusOK, gin.H{"ret": true, "res": ""})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Article信息失败！" + err.Error()})
		}

	})

	r.GET("/api/v2/Article", func(c *gin.Context) {

		var con main.Condition
		con.Init(c)
		if as, err := article.Selects(main.Client, con, !ValidateLoginStatus(c)); err == nil {
			length, _ := article.SelectsLength(main.Client, con, !ValidateLoginStatus(c))
			c.JSON(http.StatusOK, gin.H{"ret": true, "res": as, "total": length})
		} else {
			main.Return(c, false, "get Article failed！"+err.Error())
		}
	})

	r.GET("/api/v2/ArticleLength", func(c *gin.Context) {

		var con main.Condition
		con.Init(c)
		if length, err := article.SelectsLength(main.Client, con, !ValidateLoginStatus(c)); err == nil {
			main.Return(c, true, length)
		} else {
			main.Return(c, false, "get Article length failed！"+err.Error())
		}
	})

	r.GET("/api/v2/ArticleByIds", func(c *gin.Context) {

		arrStr := strings.Split(c.DefaultQuery("ids", ""), ",")
		if arrStr[0] == "" {
			main.Return(c, false, "ArticleByIds is null！")
			return
		}

		if as, err := article.SelectsByIds(main.Client, arrStr, !ValidateLoginStatus(c)); err == nil {
			main.Return(c, true, as)
		} else {
			main.Return(c, false, "get Article failed！"+err.Error())
		}
	})

}

func GetTagList(r *gin.Engine) {

	r.GET("/api/v2/Tag", func(c *gin.Context) {

		if as, err := article.SelectTags(main.Client, !ValidateLoginStatus(c)); err == nil {
			main.Return(c, true, as)
		} else {
			main.Return(c, false, "获取 tag 失败！"+err.Error())
		}

	})
}
