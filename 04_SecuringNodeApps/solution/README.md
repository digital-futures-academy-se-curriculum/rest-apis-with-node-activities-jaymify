# Running the application

After cloning/forking the repo, install the dependencies:

```sh
npm i
```

Make sure that you have MongoDB running on http://localhost:27017 with a database called `cinema`.  This should have 4 collections (left empty):

1. films
2. openingtimes
3. signups
4. bookings

## Run the application

An npm package called `cross-env` has been used to execute the run command regardless of operating system.  This has been added to the beginning of the `start` script in **package.json**.

Run the application using:

```sh
npm start
```

## If there are issues running the application Windows-based command lines

Run the application using:

```sh
npm run start-win
```

## Chrome SSL/HTTPS errors when using self-signed certificate on localhost

Enable `Allow invalid certificates for resources loaded from localhost` by pasting the following into your Chrome address bar:

[chrome://flags/#allow-insecure-localhost](chrome://flags/#allow-insecure-localhost)

You will need to relaunch Chrome to view the applications pages

## Routes in the application

**GET:**

https://localhost:4000/allFilms - shows a list of the films in the database
https://localhost:4000/openingTimes - shows a list of the opening times in the database
https://localhost:4000/singleFilm/<_ID> - shows the film with _id

**POST:**

https://localhost:4000/makeBooking - Receives booking details and adds it to the database
https://localhost:4000/signup - Receives booking details and adds it to the database

---

# Testing the application

This uses Mocha and Chai (with the HTTP plugin in)

## Start a test run

`cross-env` has been used in the `test` script command in **package.json** to start a test run regardless of operating system:

```sh
npm test
```

## Run on a Windows-based command line

If you have issues in Windows, you can also run this specific command.

```sh
npm run test-win
```
