package tools

import (
	"flag"
	"fmt"
)

func ReadCommand() (int, string) {

	port := flag.Int("port", 0, "listening port. default 8083")
	conf := flag.String("conf", "null", "configure path to parse. default /app/pancake.toml")

	flag.Parse()

	if *port == 0 {
		fmt.Printf("Listen port hasn't assigned. Now enable default port 8083. \n Assign the port with --port={port}. for example  --port=8080.")
		*port = 8083
	}

	if *conf == "null" {
		fmt.Printf("Configure file port hasn't assigned. Now enable default conf file '/app/pancake.toml'. \n Assign the conf file with --conf={filePath}. for example --conf=/etc/pancake.toml.")
		*conf = "/app/pancake.toml"
	}

	return *port, *conf

}

var Port, confPath = ReadCommand()
