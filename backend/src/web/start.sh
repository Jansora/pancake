export GIN_MODE=release && go build main.go && cd ~/ && nohup /go/src/web/main 2&>1 >>/var/log/website/access.log &
