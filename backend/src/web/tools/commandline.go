package tools

import (
	"flag"
	"fmt"
	"os"
)


func commandline() (int, string) {

	port := flag.Int("port", 0, "listening port. (Required)")
	conf := flag.String("confPath", "null", "configure path to parse. (Required)")

	flag.Parse()

	if *port == 0 {
		fmt.Printf("listening port must be assigned")
		os.Exit(1)
	}

	if *port == 0 || *conf == "null" {
		fmt.Printf("configure path must be assigned")
		os.Exit(1)
	}

	return *port, *conf

}

var Port, confPath = commandline()