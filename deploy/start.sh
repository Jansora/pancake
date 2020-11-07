sudo docker run -d -p 9005:80 --name pancake --restart=always \
-v /var/lib/pancake/resource:/resource \
jansora/pancake:v1
