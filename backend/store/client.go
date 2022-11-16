package store

import (
	"database/sql"
	"github.com/Jansora/pancake/backend/tools"
	_ "github.com/lib/pq"
)

func client() *sql.DB {

	db, err := sql.Open("postgres", tools.Conf.Postgres.Connect())
	db.Ping()
	if err != nil {
		panic(err)
	}
	return db
}

var Client = client()
