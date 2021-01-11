package serve

import (
	"database/sql"
	"fmt"
	"github.com/Jansora/pancake/backend/tools"
	_ "github.com/go-sql-driver/mysql"
	"strings"
	"time"
)

func getClient() *sql.DB {

	db, err := sql.Open("mysql", tools.Conf.Mysql.ConnectString)

	if err != nil {
		panic(err)
	}
	return db
}

var client = getClient()


func CreateTable() {
	s := `
CREATE TABLE IF NOT EXISTS Article(
	Id 			INT        PRIMARY KEY  NOT NULL auto_increment,
	CreateAt    VARCHAR(20)               NOT NULL,
	UpdateAt    VARCHAR(20)               NOT NULL,
	Classify    TEXT                    NOT NULL,
	Tag         TEXT                            ,
	Enabled     tinyint(1)                 NOT NULL,
	Logo        TEXT                    NOT NULL,
	Title       TEXT                    NOT NULL,
	Description TEXT                            ,
	Raw         TEXT                            
);`
	_, err := client.Exec(s)
	if err != nil {
		panic(err)
	}
}


func FetchArticles(c Condition, Enabled bool) ([]Article, error) {

	As := []Article{}

	querySql := `SELECT id,  classify, tag, logo, title, description, createAt, updateAt, (enabled = 1) enabled  FROM Article WHERE 1 = 1 `

	if Enabled {
		querySql += " AND Enabled=true "
	}

	if c.Tag != "" {
		querySql += " AND Tag LIKE '%" + c.Tag + "%'  "
	}

	if c.Title != "" {
		querySql += " AND Title LIKE '%" + c.Title + "%'  "
	}
	querySql += " ORDER BY " + c.SortType + " " + c.Sort
	querySql += " LIMIT " + c.Limit + " OFFSET " + c.Offset



	r, err := client.Query(querySql)
	if err != nil {
		fmt.Println(err)
	}
	defer r.Close()

	for r.Next() {
		var A Article
		r.Scan(
			&A.Id,
			&A.Classify,

			&A.Tag,
			&A.Logo,
			&A.Title,
			&A.Description,
			&A.CreateAt,
			&A.UpdateAt,
			&A.Enabled,
		)

		As = append(As, A)
	}

	return As, err
}

func FetchArticlesCount(c Condition, Enabled bool) (int, error) {

	querySql := `SELECT COUNT(1) FROM Article WHERE 1 = 1 `

	length := 0

	if Enabled {
		querySql += " AND Enabled=true "
	}

	if c.Tag != "" {
		querySql += " AND Tag LIKE '%" + c.Tag + "%'  "
	}

	if c.Title != "" {
		querySql += " AND Title LIKE '%" + c.Title + "%'  "
	}

	err := client.QueryRow(querySql).Scan(
		&length,
	)

	if err != nil {
		fmt.Println(err)
	}

	return length, err
}


func FetchArticle( Id string, Enabled bool) (Article, error) {

	A := Article{}
	querySql := fmt.Sprintf(`SELECT 
id, classify,  raw, createAt, updateAt, tag, enabled, logo, title, description
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


func InsertArticle( A *Article) error {

	//sql := `INSERT INTO Article ( Logo) VALUES (?);`

	prepared, err := client.Prepare(`INSERT INTO Article ( classify, tag, logo, title, description, raw, enabled, createAt, updateAt ) VALUES (?, ?,?,?,?,?,?,?,?);`)

	if err != nil {
		return err
	}

	A.CreateAt = time.Now().Format("2006-01-02 15:04:05")
	A.UpdateAt = A.CreateAt

	result, err2 := prepared.Exec(
				A.Classify,
				A.Tag,
				A.Logo,
				A.Title,
				A.Description,
				A.Raw,
				A.Enabled,
				A.CreateAt,
				A.UpdateAt,
	)
	if err2 != nil {
		return err2
	}

	id, err3 := result.LastInsertId()
	if err3 != nil {
		return err3
	}
	A.Id = id

	return err
}
//
//func InsertArticle( A Article) error {
//
//	sql := `INSERT INTO Article
//(classify, tag, logo, title, description, raw, enabled, createAt, updateAt) VALUES
//($1, $2,  $3, $4, $5, $6, $7, $8, $9);`
//
//	A.CreateAt = time.Now().Format("2006-01-02 15:04:05")
//	A.UpdateAt = A.CreateAt
//	_, err := client.Exec(sql,
//		A.Classify,
//		A.Tag,
//		A.Logo,
//		A.Title,
//		A.Description,
//		A.Raw,
//		A.Enabled,
//		A.CreateAt,
//		A.UpdateAt,
//	)
//
//	return err
//}


func UpdateArticle( A Article) error {

	sql := `UPDATE Article SET
  UpdateAt = NOW(), CLassify = $1
Tag= $2, Enabled= $3,  Logo= $4,Title= $5, Description= $6, Raw= $7
WHERE Id = $8;`

	_, err := client.Exec(sql,
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

func FetchTags(classify string, Enabled bool) (map[string]int, error) {


	var Tags = map[string]int{}
	querySql := fmt.Sprintf(`SELECT DISTINCT Tag FROM Article WHERE 1=1 `)

	if(classify != "") {
		querySql += " AND  classify=" + classify

	}

	if Enabled {
		querySql += " Enabled=true; "
	}

	r, err := client.Query(querySql)

	if err != nil {
		return Tags, err
	}
	defer r.Close()
	for r.Next() {
		element := ""
		r.Scan(&element)
		tags := strings.Split(element, ",")

		for _, tag := range tags {
			if value, ok := Tags[tag]; ok {
				Tags[tag] = value + 1
			} else {
				Tags[tag] = 0
			}

		}

	}
	return Tags, err
}

func FetchLogos( Enabled bool) ([]string, error) {

	Arrs := []string{}
	querySql := fmt.Sprintf(`SELECT DISTINCT Logo FROM Article `)
	if Enabled {
		querySql += " Where Enabled=true;"
	}

	r, err := client.Query(querySql)

	if err != nil {
		return Arrs, err
	}
	defer r.Close()
	for r.Next() {
		element := ""
		r.Scan(&element)
		Arrs = append(Arrs, element)
	}
	return Arrs, err
}

func FetchClassifies( Enabled bool) (map[string]int, error) {

	Arrs := map[string]int{}
	querySql := fmt.Sprintf(`SELECT classify  FROM Article  WHERE 1 = 1 `)
	if Enabled {
		querySql += " AND Enabled=true "
	}

	r, err := client.Query(querySql)

	if err != nil {
		return Arrs, err
	}
	defer r.Close()

	var classify string
	for r.Next() {
		r.Scan(&classify)
		if value, ok := Arrs[classify]; ok {
			Arrs[classify] = value + 1
		} else {
			Arrs[classify] = 0
		}

	}
	return Arrs, err

}
