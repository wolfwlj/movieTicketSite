package middleware

import (
	"fmt"
	"movieBackend/initializers"
	"movieBackend/models"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func RequireAuth(c *gin.Context) {

	// c.Header("Access-Control-Allow-Origin", "http://localhost:8080")
	// c.Header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
	// c.Header("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, X-Requested-With, Accept")
	// c.Header("Access-Control-Allow-Credentials", "true")
	//get cookie
	tokenString, err := c.Cookie("token")

	if err != nil {
		if err == http.ErrNoCookie {
			c.AbortWithStatus(204)
			return
		}
		c.AbortWithStatus(http.StatusForbidden)

		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//check if exp
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		//find user
		var user models.User
		initializers.DB.First(&user, claims["sub"])
		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		//attach to req
		c.Set("user", user)

		//move on
		c.Next()
	} else {
		fmt.Println(err)

		c.AbortWithStatus(http.StatusUnauthorized)
	}

}
