package serve

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

var JSON_ERROR = "JSON 解析失败"
var FORBIDDEN = "没有访问权限"

type Article struct {
	Id          int       `json:"Id"`
	Classify    string    `json:"Classify"`
	Tag         string    `json:"Tag"`
	Enabled     bool      `json:"Enabled"`
	Logo        string    `json:"Logo"`
	Description string    `json:"Description"`
	Title       string    `json:"Title"`
	Raw         string    `json:"Raw"`
	CreateAt    time.Time
	UpdateAt    time.Time
}

func (a Article) String() string {
	return fmt.Sprintf(`
Id: %d
Classify: %s
CreateAt: %s 
UpdateAt: %s
Tag: %s
Enabled: %t 
Logo: %s 
Description: %s
Title: %s
Raw: %s
`,
		a.Id, a.Classify, a.CreateAt, a.UpdateAt, a.Tag, a.Enabled,
		a.Logo, a.Description, a.Title, a.Raw)
}

type Condition struct {
	Limit    string
	Offset   string
	Sort     string
	SortType string
	Tag      string
	Title    string
	Classify string
}

func (c Condition) String() string {
	return fmt.Sprintf(`
Classify: %s
Title: %s
Sort: %s 
Limit: %s 
Offset: %s 
SortType: %s 
Tag: %s
`,
		c.Classify, c.Title, c.Sort, c.Limit, c.Offset, c.SortType, c.Tag)
}
func (c *Condition) Init(e *gin.Context) {
	c.Limit = e.DefaultQuery("limit", "1000000")
	c.Offset = e.DefaultQuery("offset", "0")
	c.Sort = e.DefaultQuery("sort", "desc")
	c.SortType = e.DefaultQuery("sortType", "id")
	c.Title = e.DefaultQuery("Title", "")
	c.Classify = e.DefaultQuery("Classify", "")

	c.Tag = e.DefaultQuery("Title", "")
}

func ReturnFalse(c *gin.Context, message string) {
	Return(c, false, nil, message)
	return
}
func ReturnTrue(c *gin.Context, data interface{}) {
	Return(c, true, data, "")
	return
}
func Return(c *gin.Context, status bool, data interface{}, message string) {
	c.JSON(http.StatusOK, gin.H{"status": status, "message": message, "data": data})
	return
}
