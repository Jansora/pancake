package routers

type InsertArticleType struct {
	Author   string   `json:"Author"`
	Content  string   `json:"Raw"`
	IsPublic bool     `json:"isPublic"`
	LogoUrl  string   `json:"logoUrl"`
	Url      string   `json:"Url"`
	Site     string   `json:"site"`
	Summary  string   `json:"Description"`
	Html     string   `json:"Html"`
	Tags     []string `json:"Tag"`
	Title    string   `json:"Title"`
	Toc      []string `json:"Toc"`
}

type LoginStruct struct {
	Name  string `json:"name"`
	Token string `json:"token"`
}
type LoginCheckType struct {
	LoginId    int    `json:"loginId"`
	LoginUser  string `json:"loginUser"`
	LoginToken string `json:"loginToken"`
}

var JSON_ERROR = "JSON 解析失败"
