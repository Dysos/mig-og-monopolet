WIP

A simple app where users can uploade their dilemmas, and other users can vote on what they think they should do.
Inspired by the danish podcast 'Mads og Monopolet', which often features an array of dilemmas that the hosts discuss.

How to:

> git clone https://github.com/Dysos/mig-og-monopolet.git

> cd mig-og-monopolet/api

> npm install

> cd ../client

> npm install

Set up a database with the table in db.sql

create a new file in the api folder, called config.env, with the following contents:

> DB_HOST={hostname for your database}
> DB_USER={a username that has access to the db}
> DB_PASSWORD={password for the user}
> DB_DATABASE={name of the db}

in client folder:

> npm start

in api folder

> node server.js

And you're good to go 👍
