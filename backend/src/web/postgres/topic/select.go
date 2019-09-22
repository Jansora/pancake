package topic

import (
	"database/sql"
	"fmt"
	"github.com/lib/pq"
	"web/postgres/article"
)

func Select(db *sql.DB, Url string, IsPublic bool) (Topic, error) {

	A := Topic{}
	querySql := fmt.Sprintf(`SELECT 
Id , Name , Url, Description, Articles, Is_public, Logo_url, Create_time, Modify_time FROM Topic WHERE Url = '%s' `, Url)
	if IsPublic {
		querySql += "AND Is_public=true"
	}

	err := db.QueryRow(querySql).Scan(
		&A.Id,
		&A.Name,
		&A.Url,
		&A.Description,
		pq.Array(&A.Articles),
		&A.Is_public,
		&A.Logo_url,
		&A.Create_time,
		&A.Modify_time,
	)

	if(err != nil) {
		return A, err
	}
	A.ArticleObjects, err = article.SelectsByIds(db, A.Articles, IsPublic)

	return A, err
}

func Selects(db *sql.DB,  IsPublic bool) ([]Topic, error) {

	As := []Topic{}

	querySql := `SELECT Id , Name , Url, Description, Articles, Is_public, Logo_Url, Create_time, Modify_time FROM Topic `

	if IsPublic {
		querySql += "WHERE Is_public=true"
	}
	r, err := db.Query(querySql)
	if err != nil {
		fmt.Println(err)
	}
	defer r.Close()

	for r.Next() {
		var A Topic;

		r.Scan(
			&A.Id,
			&A.Name,
			&A.Url,
			&A.Description,
			pq.Array(&A.Articles),
			&A.Is_public,
			&A.Logo_url,
			&A.Create_time,
			&A.Modify_time,
		)
		A.ArticleObjects, err = article.SelectsByIds(db, A.Articles, IsPublic)
		As = append(As, A)
	}

	return As, err
}