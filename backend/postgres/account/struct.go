package account

import (
	"fmt"
	"time"
)

type Account struct {
	Id          int
	Name        string
	Password    string
	Website     string
	Origin      string
	OriginId    int
	Age         int
	Email       string
	Admin       bool
	Create_time time.Time
	Modify_time time.Time
	State       string
}

func (u Account) String() string {
	return fmt.Sprintf(`
Id: %d 
Name: %s 
Password: %s 
Website: %s 
Origin: %s 
OriginId: %d 
Age: %s 
Email: %s 
admin: %s
State: %s
`,
		u.Id, u.Name, u.Password, u.Website, u.Origin, u.OriginId, u.Age, u.Email, u.Admin, u.State)
}
