# Every Event App

Every Event is a social media management platform that covers almost every aspect of a social media manager's role. With just one platform users are able to do the simple stuff like curate cool content and schedule posts all the way up to managing event marketing and team member roles.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Get an Ayrshare API KEY

- Go to (https://ayrshare.com) and sign up for an account (you can login with github)
- Generate an API key

## Lay of the Land

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

## Create database

Create a new database called `every_event`.

If you would like to name your database something else, you will need to change `every_event` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`

## Registration

- Navigate to `localhost:3000`
- Register as a new user (You will need the API key you generated from Ayrshare)
- You will be logged in upon completion of the registration process.

## Using the app

### Create and event

- The user is brought to the homepage upon logging in: it is on this page
  where you'll create your first event.

- The user is able to customize the name, image, acronym, and dates the event will be held on.

- Each created event will be saved to the user's profile.

- The user will then be able to select which 5 phases they want to assign to
  the event.

### Posting to social media

- The user will be able to market their events by posting to their social
  media accounts.

- Every Event allows the user to post to LinkedIn, Facebook, Twitter, Reddit,
  Telegram, and Instagram.

### Editing

- The user is able to edit Events, Phases, and their user information,
  by navigating to those respective pages.

## Technologies Used

- Every event was built with: React, Redux, Sagas, Express, Passport, and PostgreSQL.

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create a Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables using the database.sql file
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy
