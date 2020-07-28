package routers

import (
	pg "github.com/Jansora/pancake/backend/postgres"
	"github.com/Jansora/pancake/backend/postgres/project"
	"github.com/gin-gonic/gin"
	"net/http"
)

func InitProject(r *gin.Engine) {
	Project(r)
}

func Project(r *gin.Engine) {
	r.GET("/Golang/Project/:Url", func(c *gin.Context) {
		if a, err := project.Select(pg.Client, c.Param("Url"), !LoginStatus(c)); err == nil {
			c.JSON(http.StatusOK, gin.H{"ret": true, "res": a})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Project信息失败！" + err.Error()})
		}
	})

	r.POST("/Golang/Project/Insert", func(c *gin.Context) {
		var j InsertProjectType
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
		t := project.Project{
			Name:        j.Name,
			Url:         j.Url,
			Frame:       j.Frame,
			Is_public:   j.IsPublic,
			Logo_url:    j.LogoUrl,
			Description: j.Description,
		}
		if err := project.Insert(pg.Client, t); err != nil {
			c.JSON(http.StatusOK, gin.H{
				"ret": false, "res": "参数不能为空！" + err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"ret": true, "res": "项目创建成功！",
		})
	})

	r.POST("/Golang/Project/Update/:Url", func(c *gin.Context) {
		var j InsertProjectType
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

		if t, err := project.Select(pg.Client, c.Param("Url"), false); err == nil {
			t.Name = j.Name
			t.Url = j.Url
			t.Frame = j.Frame
			t.Is_public = j.IsPublic
			t.Logo_url = j.LogoUrl
			t.Description = j.Description
			if err := project.Update(pg.Client, t, c.Param("Url")); err != nil {
				c.JSON(http.StatusOK, gin.H{
					"ret": false, "res": "更新失敗！" + err.Error(),
				})
				return
			}
			c.JSON(http.StatusOK, gin.H{
				"ret": true, "res": "更新成功！",
			})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Project信息失败！" + err.Error()})
		}
		return

	})

	r.DELETE("/Golang/Project/:Url", func(c *gin.Context) {
		if !LoginStatus(c) {
			Ret(c, false, "无权限操作")
			return
		}
		if _, err := project.Delete(pg.Client, c.Param("Url")); err == nil {
			c.JSON(http.StatusOK, gin.H{"ret": true, "res": ""})
		} else {
			c.JSON(http.StatusOK, gin.H{"ret": false, "res": "获取Project信息失败！" + err.Error()})
		}

	})

	r.GET("/Golang/Project", func(c *gin.Context) {

		if as, err := project.Selects(pg.Client, !LoginStatus(c)); err == nil {
			Ret(c, true, as)
		} else {
			Ret(c, false, "get Article failed！"+err.Error())
		}
	})
}
