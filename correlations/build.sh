NAME=portfolio-correlations
docker stop $NAME
docker rm $NAME
docker build -t $NAME:latest .
docker run -d -p 5000:5000 --name $NAME $NAME
