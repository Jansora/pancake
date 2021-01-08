package serve

import (
	"database/sql"
	"fmt"
	"github.com/Jansora/pancake/backend/serve/routes"
	"github.com/Jansora/pancake/backend/tools"
	_ "github.com/go-sql-driver/mysql"
	"time"
)

func getClient() *sql.DB {

	db, err := sql.Open("mysql", tools.Conf.PG.ConnectString)

	if err != nil {
		panic(err)
	}
	return db
}

var client = getClient()


func CreateTable() {
	s := `
CREATE TABLE IF NOT EXISTS Article(
	Id 			SERIAL     PRIMARY KEY  NOT NULL,
	CreateAt    TIMESTAMP               NOT NULL,
	UpdateAt    TIMESTAMP               NOT NULL,
	Classify    TEXT                    NOT NULL,
	Tag         TEXT                            ,
	Enabled     BOOLEAN                 NOT NULL,
	Logo        TEXT                    NOT NULL,
	Title       TEXT                    NOT NULL,
	Description TEXT                            ,
	Raw         TEXT                            ,	
);`
	_, err := client.Exec(s)
	if err != nil {
		panic(err)
	}
}


func FetchArticles(c routes.Condition, Enabled bool) ([]routes.Article, error) {

	As := []routes.Article{}

	querySql := `SELECT Id, CLassify, CreateAt, UpdateAt, Tag, Logo, Title, Description, Enabled FROM Article WHERE 1 = 1 `

	if Enabled {
		querySql += " AND Enabled=true "
	}

	if c.Tag != "" {
		querySql += " AND Tag ILIKE '%" + c.Tag + "%'  "
	}

	if c.Title != "" {
		querySql += " AND Title ILIKE '%" + c.Title + "%'  "
	}
	querySql += " ORDER BY " + c.SortType + " " + c.Sort
	querySql += " LIMIT " + c.Limit + " OFFSET " + c.Offset



	r, err := client.Query(querySql)
	if err != nil {
		fmt.Println(err)
	}
	defer r.Close()

	for r.Next() {
		var A routes.Article
		r.Scan(
			&A.Id,
			&A.Classify,
			&A.CreateAt,
			&A.UpdateAt,
			&A.Tag,
			&A.Logo,
			&A.Title,
			&A.Description,
			&A.Enabled,
		)

		As = append(As, A)
	}

	return As, err
}

func FetchArticlesCount(c routes.Condition, Enabled bool) (int, error) {

	querySql := `SELECT COUNT (1) FROM Article WHERE 1 = 1 `

	length := 0

	if Enabled {
		querySql += " AND Enabled=true "
	}

	if c.Tag != "" {
		querySql += " AND Tag ILIKE '%" + c.Tag + "%'  "
	}

	if c.Title != "" {
		querySql += " AND Title ILIKE '%" + c.Title + "%'  "
	}

	err := client.QueryRow(querySql).Scan(
		&length,
	)

	if err != nil {
		fmt.Println(err)
	}

	return length, err
}


func FetchArticle( Id string, Enabled bool) (routes.Article, error) {

	A := routes.Article{}
	querySql := fmt.Sprintf(`SELECT 
Id, Classify,  Raw, CreateAt, UpdateAt, Tag, Enabled, Logo, Title, Description
FROM Article WHERE id = '%s' `, Id)
	if Enabled {
		querySql += "AND Enabled=true"
	}

	err := client.QueryRow(querySql).Scan(
		&A.Id,
		&A.Classify,
		&A.Raw,
		&A.CreateAt,
		&A.UpdateAt,
		&A.Tag,
		&A.Enabled,
		&A.Logo,
		&A.Title,
		&A.Description,
	)

	return A, err
}



func InsertArticle( A routes.Article) error {

	sql := `INSERT INTO Article
(CreateAt, UpdateAt, Classify, Tag, Enabled, Logo, Title, Description, Raw) VALUES
($1, $2,  $3, $4, $5, $6, $7, $8, $9);`

	_, err := client.Exec(sql,
		time.Now(),
		time.Now(),
		&A.Classify,
		A.Tag,

		A.Enabled,
		A.Logo,
		A.Title,
		A.Description,
		A.Raw,
	)

	return err
}


func UpdateArticle( A routes.Article) error {

	sql := `UPDATE Article SET
 CreateAt= $1, UpdateAt = $2, CLassify = $3
Tag= $4, Enabled= $5,  Logo= $6,Title= $7, Description= $8, Raw= $9
WHERE Id = $10;`

	_, err := client.Exec(sql,
		A.CreateAt,
		time.Now(),
		A.Classify,
		A.Tag,
		A.Enabled,
		A.Logo,
		A.Title,
		A.Description,
		A.Raw,
		A.Id,
	)

	return err
}



func DeleteArticle( Id string) error {

	querySql := fmt.Sprintf(`DELETE FROM Article WHERE id = '%s' `, Id)
	res, err := client.Exec(querySql)

	if err != nil {
		return err
	}
	_, err = res.RowsAffected()
	return  err
}


func FetchTags( Enabled bool) ([][]string, error) {

	Tags := [][]string{}
	querySql := fmt.Sprintf(`SELECT DISTINCT Tag FROM Article `)
	if Enabled {
		querySql += " Where Enabled=true;"
	}

	r, err := client.Query(querySql)

	if err != nil {
		return Tags, err
	}
	defer r.Close()
	for r.Next() {
		tag := []string{}
		r.Scan(&tag)
		Tags = append(Tags, tag)
	}
	return Tags, err
}
