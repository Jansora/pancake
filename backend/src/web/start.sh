export GIN_MODE=release && go build main.go && nohup ./main 2&>1 >>/var/log/website/access.log &
