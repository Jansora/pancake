package main

import (
	"database/sql"
	"github.com/Jansora/pancake/backend/postgres"
	"github.com/Jansora/pancake/backend/postgres/account"
	"github.com/Jansora/pancake/backend/postgres/article"
	"github.com/Jansora/pancake/backend/postgres/project"
	"github.com/Jansora/pancake/backend/postgres/topic"
	"github.com/Jansora/pancake/backend/serve"
)

func dbOp() {

	account.Create(postgres.Client)
	article.Create(postgres.Client)
	topic.Create(postgres.Client)
	project.Create(postgres.Client)
	account.InsertAdminUser(postgres.Client)

}

func initDatabase(db *sql.DB) {
	_, err := db.Exec("CREATE DATABASE Website;")
	if err != nil {
		panic(err)
	}
}
func serverOp() {
	serve.App()
}

func main() {

	dbOp()
	serverOp()

}
