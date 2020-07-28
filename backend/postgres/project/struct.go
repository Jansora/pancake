package project

import (
	"fmt"
	"time"
)

type Project struct {
	Id          int
	Name        string
	Url         string
	Frame       string
	Is_public   bool
	Logo_url    string
	Description string
	Create_time time.Time
	Modify_time time.Time
}

func (p Project) String() string {
	return fmt.Sprintf(`
Id: %d 
Name: %s 
Description: %s
Url: %s
Frame: %t
Is_public: %t 
Logo_url: %s
Create_time: %s 
Modify_time: %s 
`,
		p.Id, p.Name, p.Description, p.Url, p.Frame, p.Is_public, p.Logo_url, p.Create_time, p.Modify_time)
}
