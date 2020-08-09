cd backend && mvn package -Dmaven.test.skip=true

cd ../ && docker build -t jansora/pancake:v2 .
