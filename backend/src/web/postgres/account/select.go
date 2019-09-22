package account

import (
	"database/sql"
	"fmt"
	"web/tools"
)

func Select(db *sql.DB, U Account) Account {

	a := Account{}

	querySql := fmt.Sprintf(`SELECT Id, Name, Password, Age  FROM Account WHERE Id = '%d'`, U.Id)

	err := db.QueryRow(querySql).Scan(&a.Id, &a.Name,&a.Admin, &a.Password)
	if err != nil {
		fmt.Println(err)
		return Account{}
	}

	if tools.CompareHashAndPassword(U.Password, a.Password) {
		return a
	}
	return Account{}

}


func Selects(db *sql.DB, U Account) []Account {

	var us []Account
	querySql := fmt.Sprintf(`SELECT Name, Password, Age  FROM Account WHERE Name = '%s'`, U.Name)
	r, err := db.Query(querySql)
	if err != nil {
		fmt.Println(err)
	}
	defer r.Close()

	for r.Next() {
		var u Account
		r.Scan(&u.Name, &u.Password, &u.Age)
		us = append(us, u)
	}

	return us
}



func Login(db *sql.DB, U Account) Account {

	a := Account{}
	querySql := fmt.Sprintf(`SELECT Id, name,admin, PASSWORD FROM Account WHERE Name = '%s' `, U.Name)
	err := db.QueryRow(querySql).Scan(&a.Id, &a.Name,&a.Admin, &a.Password)
	if err != nil {
		fmt.Println(err)
		return Account{}
	}


	if tools.CompareHashAndPassword(U.Password, a.Password) {
		return a
	}
	return Account{}
}

func CheckLoginStatus(db *sql.DB, U Account) bool {

	var Id int
	querySql := fmt.Sprintf(`SELECT Id FROM Account WHERE Id = %d AND Password = '%s'`, U.Id, U.Password)
	err := db.QueryRow(querySql).Scan(&Id)
	if err != nil {
		fmt.Println(err)
	}
	if Id > 0 {
		return true
	}
	return false
}

func GetUserInfo(db *sql.DB, U Account) Account {

	a := Account{}
	querySql := fmt.Sprintf(`SELECT Id, name,admin  FROM Account WHERE Id = %d AND Password = '%s'`, U.Id, U.Password)
	err := db.QueryRow(querySql).Scan(&a.Id, &a.Name,&a.Admin,)
	if err != nil {
		fmt.Println(err)
	}

	return a
}