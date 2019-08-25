package routers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"time"
	pg "web/postgres"
	"web/postgres/article"
)

func InitArticle(r *gin.Engine) {
	Article(r)
	UpdateComment(r)
	GetTagList(r)
}


func Article(r *gin.Engine)  {
	r.GET("/Golang/Article/:Url", func(c *gin.Context) {

		if a, err := article.Select(pg.Client, c.Param("Url"), !LoginStatus(c)); err == nil {
			c.JSON(http.StatusOK, gin.H{"ret": true, "res": a})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Article信息失败！" + err.Error()})
		}
	})

	r.POST("/Golang/Article/Insert", func(c *gin.Context) {
		var j InsertArticleType;
		if err := c.BindJSON(&j); err != nil {
			c.JSON(http.StatusOK, gin.H{
				"ret": false,
				"res": "Decode json error！" + err.Error(),
			})
			return
		}
		if !LoginStatus(c) {
			return
		}
		a := article.Article{
			Author:         j.Author,
			Create_time:    time.Now(),
			Modify_time:    time.Now(),
			Site:           j.Site,
			Read_num:       0,
			Like_num:       0,
			Tags:           j.Tags,
			Url:            j.Url,
			Is_public:      j.IsPublic,
			Logo_url:       j.LogoUrl,
			Title:          j.Title,
			Summary:        j.Summary,
			Content:        j.Content,
			Html:           j.Html,
			Comment:        []string{},
			Toc:            j.Toc,
		}
		if err := article.Insert(pg.Client, a); err != nil {
			c.JSON(http.StatusOK, gin.H{
				"ret": false, "res": "参数不能为空！" + err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"ret": true, "res": "文章发表成功！",
		})
	})
	r.POST("/Golang/Article/UpdateDoc/:Url", func(c *gin.Context) {
		var j InsertArticleType;

		if err := c.BindJSON(&j); err != nil {
			c.JSON(http.StatusOK, gin.H{
				"ret": false,
				"res": "Decode json error！" + err.Error(),
			})
			return
		}
		if !LoginStatus(c) {
			return
		}
		if a, err := article.Select(pg.Client, c.Param("Url"), false); err == nil {
			a.Content = j.Content;
			if err := article.Update(pg.Client, a, c.Param("Url")); err != nil {
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

	r.POST("/Golang/Article/Update/:Url", func(c *gin.Context) {
		var j InsertArticleType;
		if err := c.BindJSON(&j); err != nil {
			c.JSON(http.StatusOK, gin.H{
				"ret": false,
				"res": "Decode json error！" + err.Error(),
			})
			return
		}
		if !LoginStatus(c) {
			return
		}

		if a, err := article.Select(pg.Client, c.Param("Url"), false); err == nil {
			a.Title = j.Title;
			a.Url = j.Url;
			a.Author = j.Author;
			a.Modify_time = time.Now();
			a.Site = j.Site;
			a.Tags = j.Tags;
			a.Is_public = j.IsPublic;
			a.Logo_url = j.LogoUrl;
			a.Summary = j.Summary;
			a.Toc = j.Toc;
			a.Content = j.Content;
			a.Html = j.Html;
			if err := article.Update(pg.Client, a, c.Param("Url")); err != nil {
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

	r.POST("/Golang/Article/UpdateLike/:Url", func(c *gin.Context) {
		if a, err := article.Select(pg.Client, c.Param("Url"), !LoginStatus(c)); err == nil {
			a.Like_num += 1
			if err := article.Update(pg.Client, a, c.Param("Url")); err != nil {
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


	r.DELETE("/Golang/Article/:Url", func(c *gin.Context) {
		if !LoginStatus(c) {
			Ret(c, false, "无权限操作")
			return
		}
		if _, err := article.Delete(pg.Client, c.Param("Url")); err == nil {
			c.JSON(http.StatusOK, gin.H{"ret": true, "res": ""})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Article信息失败！" + err.Error()})
		}



	})

	r.GET("/Golang/Article", func(c *gin.Context) {

		var con article.Condition;
		con.Init(c);
		if as, err := article.Selects(pg.Client, con, !LoginStatus(c)); err == nil {
			length, _ := article.SelectsLength(pg.Client, con, !LoginStatus(c));
			c.JSON(http.StatusOK, gin.H{"ret": true, "res": as, "total": length})
		} else {
			Ret(c, false, "get Article failed！" + err.Error())
		}
	})

	r.GET("/Golang/ArticleLength", func(c *gin.Context) {

		var con article.Condition;
		con.Init(c);
		if length, err := article.SelectsLength(pg.Client, con, !LoginStatus(c)); err == nil {
			Ret(c, true, length)
		} else {
			Ret(c, false, "get Article length failed！" + err.Error())
		}
	})

	r.GET("/Golang/ArticleByIds", func(c *gin.Context) {

		arrStr := strings.Split(c.DefaultQuery("ids", ""), ",")
		if arrStr[0] == "" {
			Ret(c, false, "ArticleByIds is null！")
			return
		}

		if as, err := article.SelectsByIds(pg.Client, arrStr, !LoginStatus(c)); err == nil {
			Ret(c, true, as)
		} else {
			Ret(c, false, "get Article failed！" + err.Error())
		}
	})


}

func UpdateComment(r *gin.Engine)  {
	r.POST("/Golang/Comment/Update/:Url", func(c *gin.Context) {
		var j UpdateCommentType;

		if err := c.BindJSON(&j); err != nil {
			Ret(c, false,  "Decode json error！" + err.Error())
			return
		}
		IsLogin := OauthLoginStatus(c);
		if(!IsLogin){
			Ret(c, false,  "请先登录")
			return
		}
		a, err := article.Select(pg.Client, c.Param("Url"), !IsLogin)
		if err != nil {
			Ret(c, false,  "获取 Comment 信息 失败！" + err.Error())
			return
		}
		if len(a.Comment) > 100 {
			Ret(c, false,  "评论最长为100" + err.Error())
			return
		}
		if len(a.Comment) != (len(j.Comment) + 1) && !IsLogin {
			Ret(c, false,  "违规操作" + err.Error())
			return
		}
		a.Comment = append(a.Comment, j.Comment)
		if err := article.Update(pg.Client, a, c.Param("Url")); err != nil {
			Ret(c, false,  "更新评论失败" + err.Error())
			return
		}
		Ret(c, true, a.Comment)
	})
}

func GetTagList(r *gin.Engine) {

	r.GET("/Golang/Tags", func(c *gin.Context) {
		var con article.Condition;
		con.Init(c);
		if as, err := article.SelectTags(pg.Client, con, !LoginStatus(c)); err == nil {
			Ret(c, true, as)
		} else {
			Ret(c, false, "获取 tag 失败！" + err.Error())
		}

	})
}
