package db

import (
	"database/sql"

	_ "github.com/lib/pq"
)

type DataBase struct {
	connection *sql.DB
}

func (db *DataBase) GetUserMailById(id int) (string, error) {
	row := db.connection.QueryRow("select email from account where id = $1", id)
	str := ""
	err := row.Scan(&str)
	return str, err
}

func (db *DataBase) GetUserId(login string, password string) (string, error) {
	row := db.connection.QueryRow("select email from account where id = $1 and password = $2", login, password)
	str := ""
	err := row.Scan(&str)
	return str, err
}

func (db *DataBase) SetUser(login string, password string, email string) error {
	_, err := db.connection.Exec("insert into account (login, password, email) values ($1, $2, $3)",
		login, password, email)
	return err
}

func NewDB(str string) *DataBase {
	conn, err := sql.Open("postgres", str)
	if err != nil {
		panic(err)
	}

	var db DataBase = DataBase{
		conn,
	}

	return &db
}

func (db *DataBase) Close() {
	db.connection.Close()
}
