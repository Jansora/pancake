package article

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/lib/pq"
	"strconv"
	"strings"
)

func Select(db *sql.DB, Url string, IsPublic bool) (Article, error) {

	A := Article{}
	querySql := fmt.Sprintf(`SELECT 
Id , Author,Raw,CreateAt, UpdateAt, Site, Url, ReadNum, LikeNum, Tag, Enabled, Logo,
Title, Description
FROM Article WHERE Url = '%s' `, Url)
	if IsPublic {
		querySql += "AND Enabled=true"
	}

	err := db.QueryRow(querySql).Scan(
		&A.Id,
		&A.Author,
		&A.Raw,
		&A.CreateAt,
		&A.UpdateAt,
		&A.Site,
		&A.Url,
		&A.ReadNum,
		&A.LikeNum,
		pq.Array(&A.Tag),
		&A.Enabled,
		&A.Logo,
		&A.Title,
		&A.Description,
	)
	if IsPublic {
		UpdateReadNum(db, A.ReadNum+1, A.Id)
	}

	return A, err
}

func SelectsLength(db *sql.DB, c Condition, IsPublic bool) (int, error) {

	querySql := `SELECT COUNT (Id) FROM Article WHERE $1 <@ Tag `

	length := 0

	if IsPublic {
		querySql += " and Enabled=true "
	}
	arr := []string{}
	if len(c.Tag) > 0 {
		arr = c.Tag
	}

	if c.Title != "" {
		querySql += " and Title ILIKE '%" + c.Title + "%'  "
	}

	err := db.QueryRow(querySql, pq.Array(arr)).Scan(
		&length,
	)

	if err != nil {
		fmt.Println(err)
	}

	return length, err
}

func Selects(db *sql.DB, c Condition, IsPublic bool) ([]Article, error) {

	As := []Article{}

	querySql := `SELECT Id, Author, CreateAt, UpdateAt, Site, Url,  ReadNum, LikeNum, Tag, Logo,
	Title, Description, Enabled FROM Article WHERE $1 <@ Tag `

	if c.Title != "" {
		querySql += " and Title ILIKE '%" + c.Title + "%'  "
	}

	if IsPublic {
		querySql += " and Enabled=true "
	}
	querySql += " ORDER BY " + c.SortType + " " + c.Sort
	querySql += " LIMIT " + c.Limit + " OFFSET " + c.Offset
	arr := []string{}
	if len(c.Tag) > 0 {
		arr = c.Tag
	}

	r, err := db.Query(querySql, pq.Array(arr))
	if err != nil {
		fmt.Println(err)
	}
	defer r.Close()

	for r.Next() {
		var A Article
		r.Scan(
			&A.Id,
			&A.Author,
			&A.CreateAt,
			&A.UpdateAt,
			&A.Site,
			&A.Url,
			&A.ReadNum,
			&A.LikeNum,
			pq.Array(&A.Tag),
			&A.Logo,
			&A.Title,
			&A.Description,
			&A.Enabled,
		)

		As = append(As, A)
	}

	return As, err
}

func SelectById(db *sql.DB, Id string, IsPublic bool) (Article, error) {

	A := Article{}
	querySql := fmt.Sprintf(`SELECT 
Id , Author,Raw,CreateAt, UpdateAt, Site, Url, ReadNum, LikeNum, Tag, Enabled, Logo,
Title, Description
FROM Article WHERE Id = '%s' `, Id)
	if IsPublic {
		querySql += "AND Enabled=true"
	}

	err := db.QueryRow(querySql).Scan(
		&A.Id,
		&A.Author,
		&A.Raw,
		&A.CreateAt,
		&A.UpdateAt,
		&A.Site,
		&A.Url,
		&A.ReadNum,
		&A.LikeNum,
		pq.Array(&A.Tag),
		&A.Enabled,
		&A.Logo,
		&A.Title,
		&A.Description,
	)
	if IsPublic {
		_ = UpdateReadNum(db, A.ReadNum+1, A.Id)
	}

	return A, err
}

func SelectsByIds(db *sql.DB, as []string, IsPublic bool) ([]Article, error) {

	var As []Article

	for _, a := range as {
		if strings.Index(a, "document") != -1 {

			var m map[string]interface{}
			_ = json.Unmarshal([]byte(a), &m)
			A, _ := SelectById(db, strconv.Itoa(int(m["id"].(float64))), IsPublic)
			A.Raw = ""
			A.Description = ""
			As = append(As, A)
		} else {
			As = append(As, Article{})
		}

	}

	return As, nil
}

func SelectTags(db *sql.DB, IsPublic bool) ([][]string, error) {

	Tags := [][]string{}
	querySql := fmt.Sprintf(`SELECT Tag FROM Article `)
	if IsPublic {
		querySql += " Where Enabled=true;"
	}

	r, err := db.Query(querySql)

	if err != nil {
		return Tags, err
	}
	defer r.Close()
	for r.Next() {
		tag := []string{}
		r.Scan(pq.Array(&tag))
		Tags = append(Tags, tag)
	}
	return Tags, err
}
