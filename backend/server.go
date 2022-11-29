package main

import (
	"net/http"

	"backend/db"
	"backend/user"

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

func routes(e *echo.Echo) {
	e.POST("/auth", func(c echo.Context) error {

		return c.String(http.StatusOK, "auth")
	})

	e.POST("/registration", func(c echo.Context) error {

		return c.String(http.StatusOK, "registration")
	})

}

func restrictedRoutes(r *echo.Group) {
	r.GET("/:id/mail", func(c echo.Context) error {

		//id := c.Param("id")

		return c.String(http.StatusOK, "mail")
	})
}
