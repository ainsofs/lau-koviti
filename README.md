# My COVID19 Test Results Research

Repo for learning Quasar.


**Getting started**

```
docker-compose up -d
```

Once installed you can access the dev site on port 8080. e.g. localhost:8080

Compiled SPA can be accessed on port 8000. e.g. localhost:8000/index.html


**Common commands**

```
# start up dev environment
docker-compose up -d

# stop environment
docker-compose stop

# delete everything and start in a clean environment
docker-compose down -v

# check logs
docker-compose logs -f

# check logs for specific container
docker-compose logs -f node

# log into node container (this will allow use of drush and composer)
docker-compose exec node sh

```
