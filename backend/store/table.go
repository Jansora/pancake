package store

func CreateArticleTable() {
	s := `
CREATE TABLE IF NOT EXISTS Article(
ID 			   SERIAL          PRIMARY KEY              NOT NULL,
	CREATED_AT    TIMESTAMP               NOT NULL,
	UPDATED_AT    TIMESTAMP               NOT NULL,
	
    NAME  TEXT                    NOT NULL,
    DESCRIPTION  TEXT                    NOT NULL,
    ENABLED BOOLEAN     NOT NULL,
    CLASSIFY   TEXT                    NOT NULL,
    TAG   TEXT                    NOT NULL,
    LOGO   TEXT                    NOT NULL,
    USER_ID   TEXT                    NOT NULL,
    RAW   TEXT                    NOT NULL
);`
	_, err := Client.Exec(s)
	if err != nil {
		panic(err)
	}
}
