package account

import "database/sql"

func UpdateState(db *sql.DB, state string, originId int) error {
	execSql := `UPDATE account SET state = $1 WHERE originId = $2;`
	_, err := db.Exec(execSql,
		state,
		originId,
	)
	return err
}
