package model

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

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

// Of /**
func ConditionOf(e *gin.Context) Condition {
	var c Condition
	c.Limit = e.DefaultQuery("limit", "1000000")
	c.Offset = e.DefaultQuery("offset", "0")
	c.Sort = e.DefaultQuery("sort", "desc")
	c.SortType = e.DefaultQuery("sortType", "id")
	c.Title = e.DefaultQuery("title", "")
	c.Classify = e.DefaultQuery("classify", "")

	c.Tag = e.DefaultQuery("tag", "")
	return c
}
