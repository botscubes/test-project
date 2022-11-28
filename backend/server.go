package main

import (
	"net/http"

	"backend/db"

	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

func main() {
	connStr := "user=test password=test dbname=test sslmode=disable"
	db := db.NewDB(connStr)

	defer db.Close()

	e := echo.New()
	routes(e)
	e.Logger.Fatal(e.Start(":1323"))
}

func routes(e *echo.Echo) {
	e.POST("/auth", func(c echo.Context) error {

		return c.String(http.StatusOK, "auth")
	})

	e.POST("/registration", func(c echo.Context) error {

		return c.String(http.StatusOK, "registration")
	})

	e.GET("/user/:id/mail", func(c echo.Context) error {

		//id := c.Param("id")

		return c.String(http.StatusOK, "mail")
	})
}
