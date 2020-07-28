package project

import (
	"database/sql"
	"time"
)

func Update(db *sql.DB, A Project, url string) error {

	sql := `UPDATE Project SET
Name = $1, Url= $2, Frame = $3, Is_public= $4, Logo_url= $5, Modify_time = $6 ,Description = $7 WHERE Url = $8;`

	_, err := db.Exec(sql,
		A.Name,
		A.Url,
		A.Frame,
		A.Is_public,
		A.Logo_url,
		time.Now(),
		A.Description,
		url,
	)

	return err
}
