# _WINGMAN: A web based TTS & STT chat app_
<img src="https://camo.githubusercontent.com/1c5c800fbdabc79cfaca8c90dd47022a5b5c7486/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d616972626e622d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265" />
[![MyGet](https://img.shields.io/myget/mongodb/v/MongoDB.Driver.Core.svg?maxAge=2592000)]()
[![node](https://img.shields.io/node/v/gh-badges.svg?maxAge=2592000?style=plastic)]()

Full-Stack REACT & Redux - Created: 14 October 2016
<!-- ### Deployed on Heroku [here](https://itiner-ez.herokuapp.com/). -->

## DESCRIPTION:
Uses voice to text and text to voice for geolocation chat.

## Boilerplate:
[React, Redux, Express, Sagas](https://github.com/TobiahRex/reactBoilerplate)

## Technologies:
  - Redux
  - Express
  - Mongo & Mongoose
    * Database manipulation is 100% promise based.
      - Uses mongoose & bluebird for Promise library.
  - Node
  - Sagas
  - Material UI
  - Babel
  - ESlint (Airbnb Style Guide)
  - Firebase

## Setup:
  - `npm install`
  - `npm start` for development server
  - `npm build` for production server

  NOTE: I Highly recommend running npm update --save to update package json before running "npm start" or "npm build".

## Updates:
  - October 21st-23rd:
    * (1. PLAN): Wrap up front end login & logout.
    * (2. PLAN): Begin audio recording and Bluemix TTS.
    * (3. PLAN): Save Bluemix results to Users profile in Firebase.

  - October 20th:
    * Refactored All Components into re-usable components.
      - LoginCard: modified
      - RegisterCard: modified
      - TextField template: created
      - Thing.js: modified/modularized
      - editGroup: created
      - submitGroup: created

  - October 19th
    * Plugged in Login & Register Containers to respective Sagas.
    * Created Error handling for Login & Register Components, w/msgs from BE API rendering to dialogs in the FE.
    * Added "activeDevices" to BE schema, and FE store to track logged in devices.

  - October 18th, backend manual auth API fully functional.
    * Register new user.
    * Email Register Verification.
    * Login User.
    * Get profile with middleware authorization check.

  - October 16th - 17th:  UI Components completed:
    * Login
    * Register
    * Home

  - October 14th - 15th: API Saga's Completed.
    * Crud on backend using SAGAs completed.
