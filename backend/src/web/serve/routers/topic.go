package routers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	pg "web/postgres"
	"web/postgres/topic"
)

func InitTopic(r *gin.Engine) {
	Topic(r)
}



func Topic(r *gin.Engine)  {
	r.GET("/Golang/Topic/:Url", func(c *gin.Context) {
		if a, err := topic.Select(pg.Client, c.Param("Url"), !LoginStatus(c)); err == nil {
			c.JSON(http.StatusOK, gin.H{"ret": true, "res": a})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Article信息失败！" + err.Error()})
		}
	})

	r.POST("/Golang/Topic/Insert", func(c *gin.Context) {
		var j InsertTopicType;
		if !LoginStatus(c) {
			return
		}
		if err := c.BindJSON(&j); err != nil {
			c.JSON(http.StatusOK, gin.H{
				"ret": false,
				"res": "Decode json error！" + err.Error(),
			})
			return
		}
		t := topic.Topic{
			Name: j.Name,
			Url: j.Url,
			Articles: j.Articles,
			Is_public: j.IsPublic,
			Logo_url : j.LogoUrl,
			Description: j.Description,
		}
		if err := topic.Insert(pg.Client, t); err != nil {
			c.JSON(http.StatusOK, gin.H{
				"ret": false, "res": "参数不能为空！" + err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"ret": true, "res": "话题创建成功！",
		})
	})

	r.POST("/Golang/Topic/Update/:Url", func(c *gin.Context) {
		var j InsertTopicType;
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

		if t, err := topic.Select(pg.Client, c.Param("Url"), false); err == nil {
			t.Name = j.Name;
			t.Url = j.Url;
			t.Articles = j.Articles;
			t.Is_public = j.IsPublic;
			t.Logo_url = j.LogoUrl;
			t.Description = j.Description;
			if err := topic.Update(pg.Client, t, c.Param("Url")); err != nil {
				c.JSON(http.StatusOK, gin.H{
					"ret": false, "res": "更新失敗！" + err.Error(),
				})
				return
			}
			c.JSON(http.StatusOK, gin.H{
				"ret": true, "res": "更新成功！",
			})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Topic信息失败！" + err.Error()})
		}
		return

	})

	r.DELETE("/Golang/Topic/:Url", func(c *gin.Context) {
		if !LoginStatus(c) {
			Ret(c, false, "无权限操作")
			return
		}
		if _, err := topic.Delete(pg.Client, c.Param("Url")); err == nil {
			c.JSON(http.StatusOK, gin.H{"ret": true, "res": ""})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Topic信息失败！" + err.Error()})
		}

	})

	r.GET("/Golang/Topic", func(c *gin.Context) {

		if as, err := topic.Selects(pg.Client, !LoginStatus(c)); err == nil {
			Ret(c, true, as)
		} else {
			Ret(c, false, "get Article failed！" + err.Error())
		}
	})
}

