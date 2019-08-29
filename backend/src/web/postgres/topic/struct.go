package topic

import (
	"fmt"
	"time"
	"web/postgres/article"
)

type Topic struct {
	Id int
	Name string
	Url string
	Articles []string
	Is_public bool
	Logo_url string
	Description string
	Create_time time.Time
	Modify_time time.Time
	ArticleObjects []article.Article
}

func (t Topic) String() string {
	return fmt.Sprintf(`
Id: %d 
Name: %s 
Description: %s
Url: %s
Articles: %t
Is_public: %t 
Logo_url: %s
Create_time: %s 
Modify_time: %s 
`,
		t.Id, t.Name, t.Description, t.Url, t.Articles, t.Is_public, t.Logo_url, t.Create_time, t.Modify_time)
}