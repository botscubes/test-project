package main

import (
	"log"
	"net/http"
	"regexp"
	"unicode/utf8"

	"backend/db"
	"backend/user"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
)

func main() {
	connStr := "user=test password=test dbname=test sslmode=disable"
	db.DB = db.NewDB(connStr)
	defer db.DB.Close()
	db.Redis = db.NewPool()
	defer db.Redis.Close()

	e := echo.New()

	e.Use(middleware.CORS())
	r := e.Group("/user")

	// Configure middleware with the custom claims type
	config := middleware.JWTConfig{
		Claims:     &user.JwtCustomClaims{},
		SigningKey: []byte("test"),
	}
	r.Use(middleware.JWTWithConfig(config))

	routes(e)
	restrictedRoutes(r)

	e.Logger.Fatal(e.Start(":1323"))
}

// 0 - no error
type errorCode struct {
	Code int `json:"code"`
}

type User struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

type TokenResponse struct {
	Token string `json:"token"`
	errorCode
}

func routes(e *echo.Echo) {
	e.POST("/auth", func(c echo.Context) error {
		errCode := TokenResponse{"", errorCode{0}}
		u := new(User)
		if err := c.Bind(u); err != nil {
			return c.JSON(http.StatusBadRequest, errCode)
		}

		if matched, _ := regexp.MatchString(`^[A-Za-z0-9_]*$`, u.Name); !matched {
			errCode.Code = 1
		} else if utf8.RuneCountInString(u.Name) < 6 {

			errCode.Code = 2
		} else if utf8.RuneCountInString(u.Name) > 50 {
			errCode.Code = 3
		} else if matched, _ := regexp.MatchString(`^[A-Za-z0-9_&?!@#$%^+=*]*$`, u.Password); !matched {
			errCode.Code = 4
		} else if utf8.RuneCountInString(u.Password) < 6 {
			errCode.Code = 5
		} else if utf8.RuneCountInString(u.Password) > 50 {
			errCode.Code = 6
		} else {
			if id, err := db.DB.GetUserId(u.Name, user.GetHashedPassword(u.Password)); err == nil && id != 0 {
				if password, err := db.DB.GetUserPassword(id); err != nil {
					errCode.Code = 8
				} else {
					if user.CheckPassword(u.Password, password) {
						token, err := user.GenerateToken(id)
						if err != nil {
							errCode.Code = 8
						} else {
							//user.SaveToken(token)
							errCode.Token = token
							return c.JSON(http.StatusOK, errCode)
						}
					} else {
						errCode.Code = 10
					}

				}
			} else {
				errCode.Code = 8
			}
		}

		return c.JSON(http.StatusOK, errCode)
	})

	e.POST("/registration", func(c echo.Context) error {
		errCode := errorCode{0}
		u := new(User)
		if err := c.Bind(u); err != nil {
			return c.JSON(http.StatusBadRequest, errCode)
		}

		if matched, _ := regexp.MatchString(`^[A-Za-z0-9_]*$`, u.Name); !matched {
			errCode.Code = 1
		} else if utf8.RuneCountInString(u.Name) < 6 {

			errCode.Code = 2
		} else if utf8.RuneCountInString(u.Name) > 50 {
			errCode.Code = 3
		} else if matched, _ := regexp.MatchString(`^[A-Za-z0-9_&?!@#$%^+=*]*$`, u.Password); !matched {
			errCode.Code = 4
		} else if utf8.RuneCountInString(u.Password) < 6 {
			errCode.Code = 5
		} else if utf8.RuneCountInString(u.Password) > 50 {
			errCode.Code = 6
		} else {
			if !db.DB.CheckLogin(u.Name) {
				password := user.GetHashedPassword(u.Password)

				err := db.DB.SetUser(u.Name, password)
				if err != nil {
					log.Println(err)
					errCode.Code = 7
				}
			} else {
				errCode.Code = 9
			}

		}

		return c.JSON(http.StatusOK, errCode)
	})

}

func restrictedRoutes(r *echo.Group) {
	r.GET("/name", func(c echo.Context) error {
		u := c.Get("user").(*jwt.Token)
		claims := u.Claims.(*user.JwtCustomClaims)
		id := claims.Id
		name, err := db.DB.GetUserNameById(id)
		if err != nil {
			log.Println(err)
			return c.String(http.StatusUnauthorized, "")
		}

		return c.String(http.StatusOK, name)
	})
}
