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
Id , Author,Content, Html,Create_time, Modify_time, Site, Url, Read_num, Like_num, Tags, Is_public, Logo_url,
Title, Summary,Comment, Toc 
FROM Article WHERE Url = '%s' `, Url)
	if IsPublic {
		querySql += "AND Is_public=true"
	}

	err := db.QueryRow(querySql).Scan(
		&A.Id,
		&A.Author,
		&A.Content,
		&A.Html,
		&A.Create_time,
		&A.Modify_time,
		&A.Site,
		&A.Url,
		&A.Read_num,
		&A.Like_num,
		pq.Array(&A.Tags),
		&A.Is_public,
		&A.Logo_url,
		&A.Title,
		&A.Summary,
		pq.Array(&A.Comment),
		pq.Array(&A.Toc),
	)
	if IsPublic {
		UpdateReadNum(db, A.Read_num+1, A.Id)
	}

	return A, err
}

func SelectsLength(db *sql.DB, c Condition, IsPublic bool) (int, error) {

	querySql := `SELECT COUNT (Id) FROM Article WHERE $1 <@ Tags `

	length := 0

	if IsPublic {
		querySql += " and Is_public=true "
	}
	arr := []string{}
	if len(c.Tag) > 0 {
		arr = c.Tag
	}

	if c.AmbiguousTitle != "" {
		querySql += " and Title ILIKE '%" + c.AmbiguousTitle + "%'  "
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

	querySql := `SELECT Id, Author, Create_time, Modify_time, Site, Url,  Read_num, Like_num, Tags, Logo_url,
	Title, Summary, Is_public FROM Article WHERE $1 <@ Tags `

	if c.AmbiguousTitle != "" {
		querySql += " and Title ILIKE '%" + c.AmbiguousTitle + "%'  "
	}

	if IsPublic {
		querySql += " and Is_public=true "
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
			&A.Create_time,
			&A.Modify_time,
			&A.Site,
			&A.Url,
			&A.Read_num,
			&A.Like_num,
			pq.Array(&A.Tags),
			&A.Logo_url,
			&A.Title,
			&A.Summary,
			&A.Is_public,
		)

		As = append(As, A)
	}

	return As, err
}

func SelectById(db *sql.DB, Id string, IsPublic bool) (Article, error) {

	A := Article{}
	querySql := fmt.Sprintf(`SELECT 
Id , Author,Content, Html,Create_time, Modify_time, Site, Url, Read_num, Like_num, Tags, Is_public, Logo_url,
Title, Summary,Comment, Toc 
FROM Article WHERE Id = '%s' `, Id)
	if IsPublic {
		querySql += "AND Is_public=true"
	}

	err := db.QueryRow(querySql).Scan(
		&A.Id,
		&A.Author,
		&A.Content,
		&A.Html,
		&A.Create_time,
		&A.Modify_time,
		&A.Site,
		&A.Url,
		&A.Read_num,
		&A.Like_num,
		pq.Array(&A.Tags),
		&A.Is_public,
		&A.Logo_url,
		&A.Title,
		&A.Summary,
		pq.Array(&A.Comment),
		pq.Array(&A.Toc),
	)
	if IsPublic {
		UpdateReadNum(db, A.Read_num+1, A.Id)
	}

	return A, err
}

func SelectsByIds(db *sql.DB, as []string, IsPublic bool) ([]Article, error) {

	As := []Article{}

	for _, a := range as {
		if strings.Index(a, "document") != -1 {

			var m map[string]interface{}
			_ = json.Unmarshal([]byte(a), &m)
			A, _ := SelectById(db, strconv.Itoa(int(m["id"].(float64))), IsPublic)
			A.Content = ""
			A.Summary = ""
			A.Comment = []string{}
			As = append(As, A)
		} else {
			As = append(As, Article{})
		}

	}

	return As, nil
}

func SelectTags(db *sql.DB, IsPublic bool) ([][]string, error) {

	Tags := [][]string{}
	querySql := fmt.Sprintf(`SELECT Tags FROM Article `)
	if IsPublic {
		querySql += " Where Is_public=true;"
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
