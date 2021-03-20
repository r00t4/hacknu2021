package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/r00t4/hacknu2021/lib"
)

func main() {
	fmt.Println("Hello world")
	service := lib.Service{}
	handlers := lib.Handlers{
		Service: service,
	}
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.GET("/welcome", handlers.Welcome)
	r.Run()
}
