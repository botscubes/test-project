package user

import (
	"backend/db"
	"log"

	"golang.org/x/crypto/bcrypt"
)

const ActivityInterval = 6000

func GetHashedPassword(password string) string {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	return string(hashedPassword)
}

func CheckPassword(password string, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}

func SaveToken(token string) {
	client := db.Redis.Get()
	defer client.Close()

	_, err := client.Do("SET", token, "", "EX", ActivityInterval)
	if err != nil {
		log.Fatal(err)
	}
}

func CheckToken(token string) bool {
	client := db.Redis.Get()
	defer client.Close()

	value, err := client.Do("EXISTS", token)
	if err != nil {
		log.Fatal(err)
	}

	return value.(int64) == 1

}

func RemoveToken(token string) {
	client := db.Redis.Get()
	defer client.Close()

	_, err := client.Do("DEL", token)
	if err != nil {
		log.Fatal(err)
	}
}
