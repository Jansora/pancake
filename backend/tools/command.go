package tools

import (
	"flag"
	"fmt"
)

func ReadCommand() (string) {

	conf := flag.String("conf", "null", "configure path to parse. default /app/pancake.toml")

	flag.Parse()

	if *conf == "null" {
		fmt.Printf("Configure file port hasn't assigned. Now enable default conf file '/app/pancake.toml'. \n Assign the conf file with --conf={filePath}. for example --conf=/etc/pancake.toml.")
		*conf = "/app/pancake.toml"
	}

	return  *conf

}

var confPath = ReadCommand()
