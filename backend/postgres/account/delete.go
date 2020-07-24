package account

import (
	"database/sql"
	"fmt"
)

func Delete(db *sql.DB, Id string) (bool, error) {

	querySql := fmt.Sprintf(`DELETE FROM account WHERE Id = '%s' `, Id)
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
