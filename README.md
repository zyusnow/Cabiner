# Welcome to the Cabiner ReadMe!

## Summary

Cabiner, a Airbnb similar concept, is a website for hosts to easily and freely create cabin spots to let travellers to book.


## Node modules installing
  - Backend
    - Under backend folder run: `npm install`

  - Fronted
    - Under fronted folder run: `npm install`


## Database setting up
  - Create a user
    - Under psql: `CREATE USER <user> WITH PASSWORD '<password>' CREATEDB`
  - Create .env file
    - Copy .env-example into your own .env file
    - Add values based on the file
  - Create the database as following:
    - `npx dotenv sequelize db:create`
    - `npx dotenv sequelize db:migrate`
    - `npx dotenv sequelize db:seed:all`

## Start to travel
  - Run `npm start` both under frontend and backend folder
  - Ready to go
