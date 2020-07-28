package article

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"strings"
	"time"
)

type Article struct {
	Id          int
	Author      string
	Create_time time.Time
	Modify_time time.Time
	Url         string
	Site        string
	Read_num    int64
	Like_num    int64
	Tags        []string
	Is_public   bool
	Logo_url    string
	Summary     string
	Toc         []string
	Title       string
	Content     string
	Html        string
	Comment     []string
}

func (a Article) String() string {
	return fmt.Sprintf(`
Id: %d 
Author: %s 
Create_time: %s 
Modify_time: %s 
Site: %s 
Url: %s
Read_num: %d 
Like_num: %d
Tags: %s
Is_public: %t 
Logo_url: %s 
Summary: %s 
Toc: %s 
Title: %s
Content: %s 
Comment: %s
`,
		a.Id, a.Author, a.Create_time, a.Modify_time,
		a.Site, a.Url, a.Read_num, a.Like_num, a.Tags,
		a.Is_public, a.Logo_url, a.Summary, a.Toc, a.Title,
		a.Content, a.Comment)
}

type Tags struct {
	Tags []string
}

type Condition struct {
	Limit          string
	Offset         string
	Sort           string
	SortType       string
	Tag            []string
	AmbiguousTitle string
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
	c.AmbiguousTitle = e.DefaultQuery("AmbiguousTitle", "")
	arrStr := strings.Split(e.DefaultQuery("tag", ""), ",")

	if arrStr[0] == "" {
		c.Tag = []string{}
	} else {
		c.Tag = arrStr
	}

}
