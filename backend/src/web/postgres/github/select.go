package github

import (
	"database/sql"
	"fmt"
)

func SelectBasicInfo(db *sql.DB, originId int) (Github, error) {

	A := Github{}
	querySql := fmt.Sprintf(`SELECT 
 Id, Name , Url, avatar_url, html_url FROM github WHERE GithubId = '%d' `, originId)
	err := db.QueryRow(querySql).Scan(&A.Id, &A.Name, &A.Url, &A.Avatar_url, &A.Html_url)

	return A, err
}

