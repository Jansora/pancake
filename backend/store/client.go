package store

import (
	"database/sql"
	"github.com/Jansora/pancake/backend/tools"
	_ "github.com/lib/pq"
)

func client() *sql.DB {

	db, err := sql.Open("postgres", tools.Conf.Postgresql.Connect())

	if err != nil {
		panic(err)
	}
	return db
}

var Client = client()
