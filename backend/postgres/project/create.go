package project

import (
	"database/sql"
	"time"
)

func Create(db *sql.DB) {
	sql := `CREATE TABLE IF NOT EXISTS Project(
Id 			   SERIAL          PRIMARY KEY              NOT NULL,
Frame          TEXT                                  NOT NULL,
Description    Text                                  	NOT NULL,
Url            TEXT            UNIQUE                   NOT NULL,
NAME          TEXT             UNIQUE                   NOT NULL,
Logo_url       TEXT                                     NOT NULL,
Create_time    TIMESTAMP                                NOT NULL,
Modify_time    TIMESTAMP                                NOT NULL,
Is_public      BOOLEAN                                  NOT NULL
);`
	_, err := db.Exec(sql)
	if err != nil {
		panic(err)
	}
}

func Insert(db *sql.DB, t Project) error {

	sql := `INSERT INTO Project
(Frame, Logo_Url, Url, NAME, Create_time, Modify_time, Is_public, DESCRIPTION) VALUES ($1, $2,  $3, $4, $5, $6, $7, $8);`

	_, err := db.Exec(sql,
		t.Frame,
		t.Logo_url,
		t.Url,
		t.Name,
		time.Now(),
		time.Now(),
		t.Is_public,
		t.Description,
	)

	return err
}
