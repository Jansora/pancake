cd ..
docker build  --build-arg ldc -t  jansora/pancake:v1 .
cd ./backend
go build app.go
chmod 755 app.go
cp ./app ../deploy/app/server
cd ../deploy