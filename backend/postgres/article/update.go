package article

import (
	"database/sql"
	"github.com/lib/pq"
	"time"
)

func Update(db *sql.DB, A Article, url string) error {

	sql := `UPDATE Article SET
Author = $1, CreateAt= $2, UpdateAt = $3, Site= $4, ReadNum= $5, LikeNum= $6,
Tag= $7, Enabled= $8,  Logo= $9,Title= $10, Description= $11, Raw= $12,  Url = $13, Html=$14
WHERE Url= $15;`

	_, err := db.Exec(sql,
		A.Author,
		A.CreateAt,
		time.Now(),
		A.Site,
		A.ReadNum,
		A.LikeNum,
		pq.Array(A.Tag),
		A.Enabled,
		A.Logo,
		A.Title,
		A.Description,
		A.Raw,

		A.Url,
		A.Html,
		url,
	)

	return err
}

func UpdateReadNum(db *sql.DB, readNum int64, id int) error {

	execSql := `UPDATE Article SET ReadNum= $1 WHERE id= $2;`
	_, err := db.Exec(execSql,
		readNum,
		id,
	)
	return err
}
