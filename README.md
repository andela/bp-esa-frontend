# Engagement Support Automation Frontend

[![CircleCI](https://circleci.com/gh/andela/bp-esa-frontend/tree/develop.svg?style=svg)](https://circleci.com/gh/andela/bp-esa-frontend/tree/develop) [![Maintainability](https://api.codeclimate.com/v1/badges/fa275fcb0ff11748c819/maintainability)](https://codeclimate.com/github/andela/bp-esa-frontend/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/fa275fcb0ff11748c819/test_coverage)](https://codeclimate.com/github/andela/bp-esa-frontend/test_coverage)

-----

ESA is an automated system to help Andela perform on-boarding and off-boarding processes for fellows joining or leaving engagements. This repository contains the frontend part of the project which basically reports data about what is going on in the backend.

-----

## Technologies Used

- ReactJS
- Jest

## How To Install And Run The Application

### Prerequisites

The following should be installed in your machine:

- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/download)

### Instructions

- Clone this Repo with `$ git clone https://github.com/andela/bp-esa-frontend.git`
- Change into the directory of the project
- Use `$ yarn install` to install all the dependencies of the project.
- Create a `.env` file in project root and define variables from `.env.sample` file
- Use `$ yarn start` to start the application.
- Use `$ yarn test` to execute the tests of the application.

## Docker Development Setup

### Prerequisite

- [Install docker](https://docs.docker.com/install/)
- [Deployments](https://create-react-app.dev/docs/deployment)

### Setup

On the terminal run the following  commands:

1. docker-compose
`docker-compose -f docker-compose.local.yml up`

2. Using a shell script and static server

- Build application files by running the following shell script
`./docker-serve`
- Exist the terminal process
- Run the finished build by using the following command
`serve -s build -l PORT-NUMBER`
- If you donot supply a port number the application would be run using the default port 5000
- Open your browser and navigate to localhost:3000 to view the application

## How To Contribute

### Issues

Issues are always very welcome. Please be sure to follow the [issue template](https://github.com/andela/engineering-playbook/issues/new).

### Pull requests

We're glad to get pull request if anything is missing or something is buggy. However, there are a couple of things you can do to make life easier for the maintainers:

- Explain the issue that your PR is solving - or link to an existing issue
- Follow the repository structure and new sections in the corresponding folders

> **Git Conventions**
> Make sure you adhere to [our convention](https://github.com/andela/engineering-playbook/tree/master/5.%20Developing/Conventions#commit-message) for your commits and PR.
