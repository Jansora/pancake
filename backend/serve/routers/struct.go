package routers

type InsertArticleType struct {
	Author   string   `json:"Author"`
	Content  string   `json:"Content"`
	IsPublic bool     `json:"isPublic"`
	LogoUrl  string   `json:"logoUrl"`
	Url      string   `json:"Url"`
	Site     string   `json:"site"`
	Summary  string   `json:"Summary"`
	Html     string   `json:"Html"`
	Tags     []string `json:"Tags"`
	Title    string   `json:"Title"`
	Toc      []string `json:"Toc"`
}

type UpdateCommentType struct {
	Comments []string `json:"Comment"`
}

type LoginType struct {
	UserName string `json:"userName"`
	PassWord string `json:"password"`
}
type LoginCheckType struct {
	LoginId    int    `json:"loginId"`
	LoginUser  string `json:"loginUser"`
	LoginToken string `json:"loginToken"`
}

type InsertTopicType struct {
	Name        string   `json:"Name"`
	Articles    []string `json:"articles"`
	IsPublic    bool     `json:"isPublic"`
	LogoUrl     string   `json:"logoUrl"`
	Url         string   `json:"Url"`
	Description string   `json:"description"`
}

type InsertProjectType struct {
	Name        string `json:"Name"`
	Frame       string `json:"Frame"`
	IsPublic    bool   `json:"isPublic"`
	LogoUrl     string `json:"logoUrl"`
	Url         string `json:"Url"`
	Description string `json:"description"`
}
