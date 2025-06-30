package main

import (
	"html/template"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Template struct {
	tmpl *template.Template
}

func newTemplate() *Template {
	return &Template{
		tmpl: template.Must(template.ParseGlob("views/*.html")),
	}
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.tmpl.ExecuteTemplate(w, name, data)
}

func main() {
	e := echo.New()
	e.Static("/static", "assets")
	e.Renderer = newTemplate()

	e.GET("/something", func(c echo.Context) error {
		return c.Render(http.StatusOK, "map.html", nil)
	})
	e.POST("/update-month", updateMonthHandler)
	e.POST("/update-year", updateYearHandler)

	e.Logger.Fatal(e.Start(":8000"))
}

func updateMonthHandler(c echo.Context) error {
	month := c.FormValue("month")
	return c.Render(200, "oob-month", month)
}

func updateYearHandler(c echo.Context) error {
	year := c.FormValue("year")
	return c.Render(200, "oob-year", year)
}
