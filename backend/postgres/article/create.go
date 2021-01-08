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
CreateAt    TIMESTAMP                                NOT NULL,
UpdateAt    TIMESTAMP                                NOT NULL,
Site           TEXT                                     NOT NULL,
Url            TEXT            UNIQUE                   NOT NULL,
ReadNum       INT                                      NOT NULL,
LikeNum       INT                                      NOT NULL,
Tag           TEXT []                                          ,
Enabled      BOOLEAN                                  NOT NULL,
Logo       TEXT                                     NOT NULL,
Title          TEXT                                     NOT NULL,
Description        TEXT                                     ,
Raw        TEXT                                     ,	
	);`
	_, err := db.Exec(sql)
	if err != nil {
		panic(err)
	}
}

func Insert(db *sql.DB, A Article) error {

	sql := `INSERT INTO Article
(Author, CreateAt, UpdateAt, Site, Url,       ReadNum, LikeNum, Tag, Enabled, Logo,
Title, Description,Raw) VALUES
($1, $2,  $3, $4, $5, $6, $7, $8,  $9,$10, $11, $12,  $13);`

	_, err := db.Exec(sql,
		A.Author,
		time.Now(),
		time.Now(),
		A.Site,
		A.Url,
		A.ReadNum,
		A.LikeNum,
		pq.Array(A.Tag),
		A.Enabled,
		A.Logo,
		A.Title,
		A.Description,
		A.Raw,
	)

	return err
}
