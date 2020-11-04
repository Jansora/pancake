package article

import (
	"database/sql"
	"fmt"
)

func Delete(db *sql.DB, Url string) (bool, error) {

	querySql := fmt.Sprintf(`DELETE FROM Article WHERE Url = '%s' `, Url)
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
