sudo docker run -d -p 9191:8081 --name pancake \
-e PG_USERNAME=postgres -e PG_PASSWORD=postgres \
-e PG_CONNECT_URL=jdbc:postgresql://127.0.0.1:5432/ \
-e OSS_AVAILABLE=false \
-e OSS_ENDPOINT= \
-e OSS_ACCESS_KEY_ID= \
-e OSS_ACCESS_SECRET= \
-e OSS_BUCKET= \
-e OSS_ALIAS_DOMAIN= \
-e OSS_RETURN_PREFIX= \
-e LOCAL_DOMAIN=127.0.0.1:9191 \
-e LOCAL_LOCATION=/app/resource \
-e LOCAL_RETURN_PREFIX=/ \
jansora/pancake:v2 \
