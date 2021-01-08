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

type LoginStruct struct {
	Name  string `json:"name"`
	Token string `json:"token"`
}
type LoginCheckType struct {
	LoginId    int    `json:"loginId"`
	LoginUser  string `json:"loginUser"`
	LoginToken string `json:"loginToken"`
}
