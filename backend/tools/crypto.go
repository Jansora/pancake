package tools

import (
	"golang.org/x/crypto/bcrypt"
	"math/rand"
	"strings"
	"time"
)

func GenerateFromPassword(password string) string {
	hash, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash)
}

func CompareHashAndPassword(password string, encoding string) bool {
	return bcrypt.CompareHashAndPassword([]byte(encoding), []byte(password)) == nil
}

func GetRandomPassword() string {
	rand.Seed(time.Now().UnixNano())
	chars := []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ" +
		"abcdefghijklmnopqrstuvwxyzåäö" +
		"0123456789")
	length := 8
	var b strings.Builder
	for i := 0; i < length; i++ {
		b.WriteRune(chars[rand.Intn(len(chars))])
	}
	return b.String()
}
