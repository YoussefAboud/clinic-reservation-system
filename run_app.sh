#!/bin/bash

# Start the database
docker-compose up -d go_db

# Build the containers
docker-compose build

# Start the API and React app in detached mode
docker-compose up -d go-app
docker-compose up -d react-app
