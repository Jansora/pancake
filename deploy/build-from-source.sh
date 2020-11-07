export GO111MODULE=on && export GOPROXY=https://goproxy.cn

cd ..
cd backend && go build main.go && cp main ../deploy/app/server/pancake
cd ..
cd application && npm run build && cp -r build/* ../deploy/app/app/
cd ..
cd admin && npm run build && cp -r dist/* ../deploy/app/admin/
cd ..
docker build -t jansora/pancake:v1 . --no-cache
