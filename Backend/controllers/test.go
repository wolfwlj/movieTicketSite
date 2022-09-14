package controllers

import (
	"github.com/gin-gonic/gin"
)

func Test(c *gin.Context) {

	// initializers.DB.Find(&test)

	c.JSON(200, gin.H{
		"test": "test",
	})

}
