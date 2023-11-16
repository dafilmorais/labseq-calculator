# [Quarkus + Angular] : "REST Service returning labseq sequence"

This application is designed to create an interactive labseq sequence calculator using Quarkus for the backend and Angular for the frontend.

## Challenge Description

The goal of this challenge is to create an interactive labseq sequence calculator using Quarkus for the backend and Angular for the frontend.

- The **Backend Service** should implement a RESTful API that calculates and returns values from the labseq sequence. The labseq – `l(n)` - sequence is defined as follows:
  - `n=0 => l(0) = 0`
  - `n=1 => l(1) = 1`
  - `n=2 => l(2) = 0`
  - `n=3 => l(3) = 1`
  - `n>3 => l(n) = l(n-4) + l(n-3)`

The **Endpoint** should be in the form `<baseurl>/labseq/{n}` where `{n}` represents the index of the sequence’s (single) value to return. The index may be any non-negative integer number.

The implemented service should use a caching mechanism to take advantage of previous calculations to speed up future calculations. This caching mechanism must be used in the algorithm’s intermediate calculations (if applicable), and not only in the endpoint’s invocations.

- The **Frontend** should be an Angular application that provides a simple user interface to invoke the labseq sequence calculation service. Users should be able to input a value for `n` and receive the corresponding `l(n)` value.

## Technologies :computer:

This project uses the following technologies:
- [Quarkus](https://quarkus.io/)
- [Angular](https://angular.io/)
- [Docker](https://www.docker.com/)

## Repository Structure :construction:

The repository is organized as follows:

- `backend/`: Source code and resources for the Quarkus backend.
- `frontend/`: Source code and resources for the Angular frontend.
- `docker-compose.yml`: Docker Compose configuration file to initialize the containers.
- `start.sh`: This script builds and compiles the two Docker images in order to execute this project.

## Prerequisites :warning:

 To run this project, you must have:
-  [Docker](https://www.docker.com/) -- for building & initialize the containers.
-  [Java 21](https://www.oracle.com/java/technologies/downloads/)-- quarkus dependency.
-  [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) or [GitBash](https://git-scm.com/downloads) -- for running the execution script.

## Configuration and Usage :wrench:

Make sure you have <b><u>Docker installed and running</u></b>: 

``> docker info`` 

 In the <b><u>root directory</u></b> of this project, <b><u>run the script</u></b> using the following command: 

``> ./start.sh`` 

 This script builds the two docker images from the source code and initializes them in containers. After the containers are up and running, access the frontend URL:
 
- [Angular Frontend (Labseq Calculator)](http:\\localhost)
- [SwaggerUI Backend](http://localhost/q/swagger-ui/)

Verify the addresses in your Docker.

# Conclusion :rocket:

I hope you can use this project to learn more about implementing Quafka + Angular + Docker. Happy coding! :coffee:

