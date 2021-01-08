package tools

import (
	"golang.org/x/crypto/bcrypt"
)

func GenerateFromPassword(password string) string {
	hash, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash)
}

func CompareHashAndPassword(password string, encoding string) bool {
	return bcrypt.CompareHashAndPassword([]byte(encoding), []byte(password)) == nil
}
