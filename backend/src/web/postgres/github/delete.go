package github

import (
	"database/sql"
	"fmt"
)

func Delete(db *sql.DB, GithubId int) (bool, error) {

	querySql := fmt.Sprintf(`DELETE FROM github WHERE GithubId = '%d' `, GithubId)
	res, err := db.Exec(querySql)

	if err != nil {
		fmt.Println(err)
		return false, err
	}
	num, err := res.RowsAffected()
	if num > 0 {
		return true, err
	}

	return false, err
}