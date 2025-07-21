package main

import (
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
	"path"

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

	e.GET("/", func(c echo.Context) error {
		return c.Render(http.StatusOK, "index.html", nil)
	})

	e.GET("/mapa", func(c echo.Context) error {
		return c.Render(http.StatusOK, "map.html", nil)
	})

	e.GET("/info", func(c echo.Context) error {
		return c.Render(http.StatusOK, "about.html", nil)
	})

	e.GET("/resultados", func(c echo.Context) error {
		return c.Render(http.StatusOK, "data.html", nil)
	})

	e.GET("/creditos", func(c echo.Context) error {
		return c.Render(http.StatusOK, "credits.html", nil)
	})

	e.POST("/upload", upload)

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
func upload(c echo.Context) error {
	file_name := "predictions.json"
	file, err := c.FormFile("file")
	if err != nil {
		return err
	}
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	dst, err := os.Create(path.Join("./assets", file_name))
	if err != nil {
		return err
	}
	defer dst.Close()

	if _, err = io.Copy(dst, src); err != nil {
		return err
	}

	return c.HTML(http.StatusOK, fmt.Sprintf("<p>File %s uploaded successfully", file_name))
}
