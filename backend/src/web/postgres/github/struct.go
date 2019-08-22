package github

import (
	"fmt"
	"time"
)

type Oauth struct {
	Id int
	Name string
	Url string
	Articles []string
	Is_public bool
	Avatar_url string
	Create_time time.Time
	Modify_time time.Time
}


func (t Oauth) String() string {
	return fmt.Sprintf(`
Id: %d 
Name: %s 
Url: %s
Articles: %t
Is_public: %t 
Avatar_url: %s
Create_time: %s 
Modify_time: %s 
`,
		t.Id, t.Name, t.Url, t.Articles, t.Is_public, t.Avatar_url, t.Create_time, t.Modify_time)
}

type Github struct {
	Id int
	Login string `json:"login"`
	GithubId int `json:"id"`
	Node_id string `json:"node_id"`
	Avatar_url string `json:"avatar_url"`
	Gravatar_id string `json:"gravatar_id"`
	Url string `json:"url"`
	Html_url string `json:"html_url"`
	Followers_url string `json:"followers_url"`
	Following_url string `json:"following_url"`
	Gists_url string `json:"gists_url"`
	Starred_url string `json:"starred_url"`
	Subscriptions_url string `json:"subscriptions_url"`
	Organizations_url string `json:"organizations_url"`
	Repos_url string `json:"repos_url"`
	Events_url string `json:"events_url"`
	Received_events_url string `json:"received_events_url"`
	Name string `json:"name"`
	Blog string `json:"blog"`
	Email string `json:"email"`
	Bio string `json:"bio"`
	Public_repos int `json:"public_repos"`
	Public_gists int `json:"public_gists"`
	Followers int `json:"followers"`
	Following int `json:"following"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
	Site_admin bool `json:"site_admin"`
	Company string `json:"company"`
	Location string `json:"location"`
	Hireable string `json:"hireable"`


	Create_time time.Time
	Modify_time time.Time

}
