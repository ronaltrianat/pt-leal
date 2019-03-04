# Leal PT - Ronal Alberto Triana Tarazona

Este es el repositorio de los fuentes de la prueba tecnica desarrollada para Leal.

### Stack
Las siguientes herramientas fueron utilizadas para el desarrollo de la PT.
- NodeJS v10.15.0
- MySQL Latest (https://hub.docker.com/_/mysql)
- Docker for Mac 10.14.3
- Amazon S3

### Microservices

- [Login Service](./microservices/login)
- [Reports Service](./microservices/reports)
- [Users Service](./microservices/users)
- [Transactions Service](./microservices/transactions)
- [Points Service](./microservices/points)
- [API Gateway Service](./api-gateway)

### Como iniciar los microservicios

Debe configurar la base de datos primero.

```
# Crear y arrancar servidor MySQL con Docker
docker run -d -p 3306:3306 --name='mysql-server' --env="MYSQL_ROOT_PASSWORD=password" mysql --default-authentication-plugin=mysql_native_password

# Ingresar al servidor MySQL Docker
docker exec -ti mysql-server bash

# Primera Configuracion DB
mysql -u root -p

create database pt_leal_db;
create user 'user_leal'@'%%' identified with mysql_native_password BY 'password';
grant all privileges on pt_leal_db.* TO 'user_leal'@'%%';
flush privileges;
quit;
```

This will basically install every microservice and setup the docker swarm cluster

and deploy every docker service in the swarm.

To monitor the cluster in a graphic mode we can go and visit the following url: `http://192.168.99.100:9000`

and this will give us the rancherOS web interface.

### Blog posts

- [Build a NodeJS cinema microservice and deploying it with docker (part 1)](https://medium.com/@cramirez92/build-a-nodejs-cinema-microservice-and-deploying-it-with-docker-part-1-7e28e25bfa8b)
- [Build a NodeJS cinema microservice and deploying it with docker (part 2)](https://medium.com/@cramirez92/build-a-nodejs-cinema-microservice-and-deploying-it-with-docker-part-2-e05cc7b126e0)
- [Build a NodeJS cinema booking microservice and deploying it with docker (part 3)](https://medium.com/@cramirez92/build-a-nodejs-cinema-booking-microservice-and-deploying-it-with-docker-part-3-9c384e21fbe0)
- [Build a NodeJS cinema microservice and deploying it with docker (part 4)](https://medium.com/@cramirez92/build-a-nodejs-cinema-api-gateway-and-deploying-it-to-docker-part-4-703c2b0dd269#.en6g5buwl)
- [Deploy a Nodejs microservices to a Docker Swarm Cluster (Docker from zero to hero)](https://medium.com/@cramirez92/deploy-a-nodejs-microservices-to-a-docker-swarm-cluster-docker-from-zero-to-hero-464fa1369ea0#.548ni3uxv)

### LICENSE
The MIT License (MIT)

Copyright (c) 2017 Cristian Ramirez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.