package main

import (
	"database/sql"
	"web/postgres"
	"web/postgres/account"
	"web/postgres/article"
	"web/postgres/github"

	"web/postgres/project"
	"web/postgres/topic"
	"web/serve"
)

func dbOp()  {

	account.Create(postgres.Client)
	article.Create(postgres.Client)
	topic.Create(postgres.Client)
	project.Create(postgres.Client)
	github.Create(postgres.Client)

	account.InsertAdminUser(postgres.Client)

}

func initDatabase(db *sql.DB)  {
	_, err := db.Exec("CREATE DATABASE Website;")
	if err != nil {
		panic(err)
	}
}
func serverOp() {
	serve.App()
}

func main()  {


	dbOp()
	serverOp()
	//fmt.Println(tools.Sha256("s"))

}








