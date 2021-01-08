package article

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"time"
)

type Article struct {
	Id          int
	CreateAt    time.Time
	UpdateAt    time.Time
	Classify    string
	Tag         []string
	Enabled     bool
	Logo        string
	Description string
	Title       string
	Raw         string
}

func (a Article) String() string {
	return fmt.Sprintf(`
Id: %d
CreateAt: %s 
UpdateAt: %s
Tag: %s
Enabled: %t 
Logo: %s 
Description: %s
Title: %s
Raw: %s
`,
		a.Id, a.CreateAt, a.UpdateAt, a.Tag, a.Enabled,
		a.Logo, a.Description, a.Title, a.Raw)
}

type Condition struct {
	Limit    string
	Offset   string
	Sort     string
	SortType string
	Tag      string
	Title    string
}

func (c Condition) String() string {
	return fmt.Sprintf(`
Sort: %s 
Limit: %s 
Offset: %s 
SortType: %s 
Tag: %s
`,
		c.Sort, c.Limit, c.Offset, c.SortType, c.Tag)
}
func (c *Condition) Init(e *gin.Context) {
	c.Limit = e.DefaultQuery("limit", "1000000")
	c.Offset = e.DefaultQuery("offset", "0")
	c.Sort = e.DefaultQuery("sort", "desc")
	c.SortType = e.DefaultQuery("sortType", "id")
	c.Title = e.DefaultQuery("Title", "")
	c.Tag = e.DefaultQuery("Title", "")
}
