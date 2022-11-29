package user

import (
	"time"

	"github.com/golang-jwt/jwt"
)

type JwtCustomClaims struct {
	Id int `json:"id"`
	jwt.StandardClaims
}

func GenerateToken(id int) (string, error) {
	var err error = nil
	claims := &JwtCustomClaims{
		id,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte("test"))

	return t, err
}
