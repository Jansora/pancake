cd backend && export GO111MODULE=on && export GOPROXY=https://goproxy.cn && go build main.go

docker build -t jansora/pancake:v1 . --no-cache
