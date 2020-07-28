export GIN_MODE=release && go build main.go && nohup ./main --port=8080 --confPath=/etc/conf.toml 2&>1 >>/var/log/website/access.log &
