# microservices
fena.mp4

## Description

This app demos how microservices work. Request is received from the client via http(api-gateway) and internal communication is done via kafka workers.

## Instructions

```
https://github.com/danoseun/microservice.git

cd microservice

docker-compose up -d --build
```

## Challenges
As at when this project was built, the kafka worker in the docker container would continuously retry past data it got from the api-gateway service endlessly.  This prevented it from working on new data being sent since the worker kept repeating previous data.

However, this was tested on another machine and it was same for a while but it later stopped.

The actual reason for this inconsistency is yet unknown.