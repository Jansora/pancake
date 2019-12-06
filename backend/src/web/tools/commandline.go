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

	if *port == 0 && *conf == "null" {
		fmt.Printf("Error! configure path and listening port must be assigned!\nfor example:\n    --port=8080\n    --confPath=/etc/conf.toml\n")
		os.Exit(1)
	}


	if *port == 0 {
		fmt.Printf("Error! listening port must be assigned!\nfor example:\n    --port=8080\n")
		os.Exit(1)
	}

	if *port == 0 || *conf == "null" {
		fmt.Printf("Error! configure path must be assigned!\nfor example:\n    --confPath=/etc/conf.toml\n")
		os.Exit(1)
	}

	return *port, *conf

}

var Port, confPath = commandline()