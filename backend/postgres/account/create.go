package account

import (
	"database/sql"
	"github.com/Jansora/pancake/backend/tools"
	"time"
)

func Create(db *sql.DB) {
	sql := `CREATE TABLE IF NOT EXISTS  ACCOUNT(
Id 			SERIAL      PRIMARY KEY     NOT NULL,
Name        TEXT                  		NOT NULL,
Password    TEXT                        NOT NULL,
Create_time    TIMESTAMP                                NOT NULL,
Modify_time    TIMESTAMP                                NOT NULL,
Website     TEXT,
Origin      TEXT,
OriginId INT,
Age         INT,
Email       CHAR(50) ,
Admin    BOOLEAN,
State TEXT UNIQUE 
	);`
	_, err := db.Exec(sql)
	if err != nil {
		panic(err)
	}
}

func Insert(db *sql.DB, A Account) error {

	sql := `INSERT INTO Account(Name, Password, Create_time, Modify_time, Website, Origin, OriginId, Age, Email, admin, State) VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`

	_, err := db.Exec(sql,
		A.Name,
		A.Password,
		time.Now(),
		time.Now(),
		A.Website,
		A.Origin,
		A.OriginId,
		A.Age,
		A.Email,
		A.Admin,
		A.State,
	)

	return err
}

func InsertAdminUser(db *sql.DB) {

	// 判断管理员账号是否已被创建
	if (len(Selects(db, Account{Name: tools.Conf.ADMIN.Name})) > 0) {
		return
	}

	c := Account{
		Name:     tools.Conf.ADMIN.Name,
		Password: tools.GenerateFromPassword(tools.Conf.ADMIN.Password),
		Website:  tools.Conf.ADMIN.Website,
		Admin:    tools.Conf.ADMIN.Admin,
		Email:    tools.Conf.ADMIN.Email,
	}
	err := Insert(db, c)

	if err != nil {
		panic(err)
	}
}
