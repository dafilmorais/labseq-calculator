#!/bin/bash

# Build the Quarkus backend
cd backend/
./mvnw clean package
docker build -t quarkus/backend:latest -f src/main/docker/Dockerfile.jvm .
cd ..

# Build the Angular frontend
cd frontend
docker build -t angular/app:latest -f Dockerfile .
cd ../

# Save the Docker images to tarballs
backend_tarball="quarkus-backend.tar"
frontend_tarball="angular-frontend.tar"

docker save -o $backend_tarball quarkus/backend:latest
docker save -o $frontend_tarball angular/app:latest

# Load the Docker images
docker load -i $backend_tarball
docker load -i $frontend_tarball

# Start the Docker containers
docker-compose up -d
