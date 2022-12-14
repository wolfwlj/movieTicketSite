package controllers

import (
	"movieBackend/initializers"
	"movieBackend/models"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {

	var body struct {
		Username   string
		Password   string
		Email      string
		First_name string
		Last_name  string
		Birthdate  string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse request body",
		})
		return
	}
	//has password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}
	//Create a new user

	user := models.User{
		Username:   body.Username,
		Password:   string(hash),
		Email:      body.Email,
		First_name: body.First_name,
		Last_name:  body.Last_name,
		Birthdate:  body.Birthdate}

	//Save the user to the database
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
		return
	}
	//Send a response with the user data
	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})

}

func Login(c *gin.Context) {

	var body struct {
		Username string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse request body",
		})
		return
	}
	//Find the user by username
	var user models.User

	initializers.DB.First(&user, "username= ?", body.Username)
	// initializers.DB.Raw("SELECT id, username, first_name, last_name, email, birthdate FROM users WHERE username = ?", body.Username).Scan(&user)

	//Check if the user exists

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username or password" + body.Username,
		})
		return
	}

	//Check if the password is correct

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}

	//jwt token

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to sign token",
		})
		return
	}

	//Send a response with the user data
	c.SetSameSite(http.SameSiteNoneMode)

	c.SetCookie("token", tokenString, 3600*24*30, "", "", true, true)
	c.JSON(http.StatusOK, gin.H{
		// "token": tokenString,

		"First name": user.First_name,
		"Last name":  user.Last_name,
		"Username":   user.Username,
		"Email":      user.Email,
		"Birthdate":  user.Birthdate,
	},
	)

}

func Validate(c *gin.Context) {

	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{
		"id":         user.(models.User).ID,
		"First_name": user.(models.User).First_name,
		"Last_name":  user.(models.User).Last_name,
		"Username":   user.(models.User).Username,
		"Email":      user.(models.User).Email,
		"Birthdate":  user.(models.User).Birthdate})

}
func Logout(c *gin.Context) {

	c.SetCookie("token", "", -1, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{

		"message": "Logged out successfully",
	})
}
