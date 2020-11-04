package article

import (
	"database/sql"
	"github.com/lib/pq"
	"time"
)

func Create(db *sql.DB) {
	sql := `CREATE TABLE IF NOT EXISTS Article(
Id 			   SERIAL          PRIMARY KEY              NOT NULL,
Author         TEXT                                     NOT NULL,
Create_time    TIMESTAMP                                NOT NULL,
Modify_time    TIMESTAMP                                NOT NULL,
Site           TEXT                                     NOT NULL,
Url            TEXT            UNIQUE                   NOT NULL,
Read_num       INT                                      NOT NULL,
Like_num       INT                                      NOT NULL,
Tags           TEXT []                                          ,
Is_public      BOOLEAN                                  NOT NULL,
Logo_url       TEXT                                     NOT NULL,
Title          TEXT                                     NOT NULL,
Summary        TEXT                                     ,
Toc            TEXT []                                   	,
Content        TEXT                                     ,
Html        TEXT                                     ,
Comment		   TEXT []                                  	
	);`
	_, err := db.Exec(sql)
	if err != nil {
		panic(err)
	}
}

func Insert(db *sql.DB, A Article) error {

	sql := `INSERT INTO Article
(Author, Create_time, Modify_time, Site, Url,       Read_num, Like_num, Tags, Is_public, Logo_url,
Title, Summary,Content, Html, Comment, Toc) VALUES
($1, $2,  $3, $4, $5, $6, $7, $8,  $9,$10, $11, $12,  $13, $14, $15, $16);`

	_, err := db.Exec(sql,
		A.Author,
		time.Now(),
		time.Now(),
		A.Site,
		A.Url,
		A.Read_num,
		A.Like_num,
		pq.Array(A.Tags),
		A.Is_public,
		A.Logo_url,
		A.Title,
		A.Summary,
		A.Content,
		A.Html,
		pq.Array(A.Comment),
		pq.Array(A.Toc),
	)

	return err
}
