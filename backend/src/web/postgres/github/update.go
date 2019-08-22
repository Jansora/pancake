package github

import (
	"database/sql"
	"github.com/lib/pq"
	"time"
)

func Update(db *sql.DB, A Oauth, url string) (error) {

	sql := `UPDATE Oauth SET
Name = $1, Url= $2, Articles = $3, Is_public= $4, Avatar_url= $5, Modify_time = $6 WHERE Url = $7;`

	_, err := db.Exec(sql,
		A.Name,
		A.Url,
		pq.Array(A.Articles),
		A.Is_public,
		A.Avatar_url,
		time.Now(),
		url,
	)

	return err
}
