## {Yet to think of a witty name}

## Setup

`
npm install
`

`
./getSelenium.sh
`

`
java -jar selenium-server-standalone-2.46.0.jar
`

`
npm start
`

## API
/update/{person name} will load the hard coded kitty split and select the person for the current day (this will unselect them if they're already on that day!).

## Docker

You can create 2 docker containers with docker-compose and the supplied Dockerfile.

To run against a local Docker instance:

`
docker-compose build
`

Then:

`docker-compose up
`

## TO DO

Check if person is already selected and not select them again.
Modify creating an expense so it doesn't untick the person and creates in Ben's name.
Create a setup endpoint to add the Kittysplit url?