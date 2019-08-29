package main

import (
	"database/sql"
	"fmt"
	"web/postgres"
	"web/postgres/account"
	"web/postgres/article"
	"web/postgres/project"
	"web/postgres/topic"
	"web/serve"
)

func dbOp()  {

	account.Create(postgres.Client)
	article.Create(postgres.Client)
	topic.Create(postgres.Client)
	project.Create(postgres.Client)
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
	fmt.Println("aaaaaaa")

}








