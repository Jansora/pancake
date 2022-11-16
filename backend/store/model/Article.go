package model

import "fmt"

type Article struct {
	Id          int64  `json:"id"`
	Classify    string `json:"classify"`
	Tag         string `json:"tag"`
	Enabled     bool   `json:"enabled"`
	Logo        string `json:"logo"`
	Description string `json:"description"`
	Title       string `json:"title"`
	Raw         string `json:"raw"`
	CreateAt    string `json:"createAt"`
	UpdateAt    string `json:"updateAt"`
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
