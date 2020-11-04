package article

import (
	"database/sql"
	"github.com/lib/pq"
	"time"
)

func Update(db *sql.DB, A Article, url string) error {

	sql := `UPDATE Article SET
Author = $1, Create_time= $2, Modify_time = $3, Site= $4, Read_num= $5, Like_num= $6,
Tags= $7, Is_public= $8,  Logo_url= $9,Title= $10, Summary= $11, Content= $12,  Comment= $13,Toc = $14, Url = $15, Html=$16 
WHERE Url= $17;`

	_, err := db.Exec(sql,
		A.Author,
		A.Create_time,
		time.Now(),
		A.Site,
		A.Read_num,
		A.Like_num,
		pq.Array(A.Tags),
		A.Is_public,
		A.Logo_url,
		A.Title,
		A.Summary,
		A.Content,
		pq.Array(A.Comment),
		pq.Array(A.Toc),

		A.Url,
		A.Html,
		url,
	)

	return err
}

func UpdateReadNum(db *sql.DB, readNum int64, id int) error {

	execSql := `UPDATE Article SET Read_num= $1 WHERE id= $2;`
	_, err := db.Exec(execSql,
		readNum,
		id,
	)
	return err
}
