package db

import (
	"database/sql"
	"log"

	"github.com/gomodule/redigo/redis"
	_ "github.com/lib/pq"
)

var DB *DataBase
var Redis *redis.Pool

type DataBase struct {
	connection *sql.DB
}

func (db *DataBase) GetUserNameById(id int) (string, error) {
	row := db.connection.QueryRow("select name from account where id = $1", id)
	str := ""
	err := row.Scan(&str)
	return str, err
}

func (db *DataBase) GetUserId(login string, password string) (int, error) {
	row := db.connection.QueryRow("select id from account where username = $1", login)
	id := 0
	err := row.Scan(&id)
	return id, err
}

func (db *DataBase) SetUser(login string, password string) error {
	_, err := db.connection.Exec("insert into account (username, password) values ($1, $2)",
		login, password)
	return err
}

func (db *DataBase) CheckLogin(login string) bool {
	var exists bool
	row := db.connection.QueryRow("SELECT EXISTS(SELECT 1 FROM account WHERE username=$1)",
		login)
	err := row.Scan(&exists)
	if err != nil {
		return false
	}
	return exists
}

func (db *DataBase) GetUserPassword(id int) (string, error) {
	var password string
	row := db.connection.QueryRow("select password from account where id = $1",
		id)
	err := row.Scan(&password)
	return password, err
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

func NewPool() *redis.Pool {
	return &redis.Pool{
		MaxIdle:   80,
		MaxActive: 12000,
		Dial: func() (redis.Conn, error) {
			c, err := redis.DialURL("redis://" + "" +
				"@" + "127.0.0.1" + ":" + "6379")
			if err != nil {
				log.Fatal(err)
			}
			return c, err
		},
	}
}
