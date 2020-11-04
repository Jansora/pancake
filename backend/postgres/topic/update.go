package topic

import (
	"database/sql"
	"github.com/lib/pq"
	"time"
)

func Update(db *sql.DB, A Topic, url string) error {

	sql := `UPDATE Topic SET
Name = $1, Url= $2, Articles = $3, Is_public= $4, Logo_url= $5, Modify_time = $6 ,Description = $7 WHERE Url = $8;`

	_, err := db.Exec(sql,
		A.Name,
		A.Url,
		pq.Array(A.Articles),
		A.Is_public,
		A.Logo_url,
		time.Now(),
		A.Description,
		url,
	)

	return err
}
