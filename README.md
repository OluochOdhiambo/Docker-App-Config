# Docker-App-Config
This is a simple profile app implemented using docker.

Tech stack used:
- Javascript
- Nodejs
- Mongo and Mongo-express

# To start the application
1. start mongodb and mongo-express using the mongo.yaml file.
2. create a new database in mongo-express UI.
3. create a new collection in mongo-express UI.
4. install node modules and start the node server. 

# To deploy the application, 
1. build a docker image specifying the application's name and version.
2. create a docker registry and push image into repo
3. configure and deploy to server
