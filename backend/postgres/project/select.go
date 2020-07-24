package project

import (
	"database/sql"
	"fmt"
)

func Select(db *sql.DB, Url string, IsPublic bool) (Project, error) {

	A := Project{}
	querySql := fmt.Sprintf(`SELECT 
Id , Name , Url, Description, Frame, Is_public, Logo_url, Create_time, Modify_time FROM Project WHERE Url = '%s' `, Url)
	if IsPublic {
		querySql += "AND Is_public=true"
	}
	err := db.QueryRow(querySql).Scan(
		&A.Id,
		&A.Name,
		&A.Url,
		&A.Description,
		&A.Frame,
		&A.Is_public,
		&A.Logo_url,
		&A.Create_time,
		&A.Modify_time,
	)

	return A, err
}

func Selects(db *sql.DB, IsPublic bool) ([]Project, error) {

	As := []Project{}

	querySql := `SELECT Id , Name , Url, Description, Frame, Is_public, Logo_Url, Create_time, Modify_time FROM Project `

	if IsPublic {
		querySql += "WHERE Is_public=true"
	}
	querySql += "  ORDER BY Modify_time DESC"

	r, err := db.Query(querySql)
	if err != nil {
		fmt.Println(err)
	}
	defer r.Close()

	for r.Next() {
		var A Project
		r.Scan(
			&A.Id,
			&A.Name,
			&A.Url,
			&A.Description,
			&A.Frame,
			&A.Is_public,
			&A.Logo_url,
			&A.Create_time,
			&A.Modify_time,
		)
		As = append(As, A)
	}

	return As, err
}
