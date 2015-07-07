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
/update/{person name} will load the kitty split and select the person for the current day, creating an expense if required, (this will unselect them if they're already on that day!).

/setup.html Form to set the KittySplit url and the driver for that kitty.

## Docker

You can create 2 docker containers with docker-compose and the supplied Dockerfile.

To run against a local Docker instance:

`
docker-compose build
`

Then:

`docker-compose up
`

## Running in dev

nodemon is a dev dependency so you can run:

`
node_modules/nodemon/bin/nodemon.js bin/www
`

to get live reload

## TO DO

Check if person is already selected and not select them again.
Work out the best way to do half days
