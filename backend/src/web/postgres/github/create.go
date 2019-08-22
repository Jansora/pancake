package github

import (
	"database/sql"
	"time"
)

func Create(db *sql.DB) {
	sql := `CREATE TABLE IF NOT EXISTS github(
Id 			   SERIAL          PRIMARY KEY              NOT NULL,

GithubId int ,
Public_repos int ,
Public_gists int,
Followers int ,
Following int ,
Site_admin      BOOLEAN                                  NOT NULL,
Login TEXT ,
	Node_id TEXT ,
	Avatar_url TEXT,
	Gravatar_id TEXT ,
	Url TEXT ,
	Html_url TEXT ,
	Followers_url TEXT ,
	Following_url TEXT ,
	Gists_url TEXT ,
	Starred_url TEXT ,
	Subscriptions_url TEXT ,
	Organizations_url TEXT ,
	Repos_url TEXT ,
	Events_url TEXT ,
	Received_events_url TEXT,
	Name TEXT ,
	Blog TEXT ,
	Email TEXT ,
	Bio TEXT ,
	Created_at TEXT ,
	Updated_at TEXT ,
	Company TEXT ,
	Location TEXT ,
	Hireable TEXT ,

Create_time    TIMESTAMP                                NOT NULL,
Modify_time    TIMESTAMP                                NOT NULL
);`
	_, err := db.Exec(sql)
	if err != nil {
		panic(err)
	}
}

func Insert(db *sql.DB, g Github) error {

	sql := `INSERT INTO github
(GithubId, Public_repos, Public_gists, Followers, Following, Site_admin, Login,
Node_id  ,Avatar_url ,Gravatar_id  ,Url  ,Html_url  ,Followers_url  ,Following_url  ,
	Gists_url  ,Starred_url  ,Subscriptions_url  ,Organizations_url  ,Repos_url  ,
	Events_url  ,
	Received_events_url ,
	Name  ,
	Blog  ,
	Email  ,
	Bio  ,
	Created_at  ,
	Updated_at  ,
	Company  ,
	Location  ,
	Hireable  ,
Create_time, Modify_time
) VALUES (
$1, $2,  $3, $4, $5, $6, $7, $8, $9, $10,
$11, $12,  $13, $14, $15, $16, $17, $18, $19, $20,
$21, $22,  $23, $24, $25, $26, $27, $28, $29, $30, 
$31, $32
);`
	_, err := db.Exec(sql,
		g.GithubId, g.Public_repos, g.Public_gists, g.Followers, g.Following, "false", g.Login,
		g.Node_id, g.Avatar_url, g.Gravatar_id, g.Url, g.Html_url, g.Followers_url, g.Following_url, g.Gists_url,
		g.Starred_url, g.Subscriptions_url, g.Organizations_url, g.Repos_url, g.Events_url, g.Received_events_url,
		g.Name, g.Blog, g.Email, g.Bio, g.Created_at, g.Updated_at, g.Company, g.Location, g.Hireable,
		time.Now(), time.Now(),
	)

	return err
}
