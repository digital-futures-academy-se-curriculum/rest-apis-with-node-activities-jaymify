# Introducing Node

## Activity 1 - Install NodeJS and Nodemon!

Install the **LTS version** of NodeJS IF YOU NEED TO!

Check it is there by using:

```sh
node --version && npm --version
```

Globally install `nodemon` - this is a package that will allow you to edit **.js** files you want to run in `node` without having to stop and start the application over again:

```sh
npm i --location=global nodemon
# if using Linux/MacOS this may need preceding with sudo
```

To run a file called **index.js** in the current terminal folder with `nodemon` type:

```sh
nodemon index
```
>This is the end of this activity

---

## Activity 2  -- Using REPL

1.  Point the command line at the **01_IntroducingNode/starter** folder.
2.  Launch Node from the command line using:
```sh
node
```
3.  Access the help file by typing:
```sh
> .help
```
4.  Create a function called doStuff that logs a message:
```sh
> doStuff = () => "A message"
```
5.  Call it:
```sh
> doStuff()
```  
6.  Save the function to **repl.js**:
```sh
.save repl.js
```
7.  Exit node using CTRL+C.

8.  Open **repl.js** file in your code editor

9.  Alter the function to add two numbers together and report the outcome
    
```js
doStuff = (num1, num2) => num1 + num2
```

1.  Adjust the function call to pass in two variables
```
doStuff(3, 2)
```
11. Save the file
12. Relaunch node REPL and load the file
```sh
node

> .load repl.js
```

Observe the output

>This is the end of this activity

---

## Activity 3 - Building a NodeJS server

### Short instructions

* Use your code editor to create a simple server
  * You will need to instantiate a variable to hold the server object
* Use the __`require`__ method to access the __`http`__ object
* Instantiate a __`server`__ with a __`req`__ uest and __`res`__ ponse parameter
* Write an appropriate __`mime`__ type to the head (use __`writeHead()`)
* Create a simple message to return in the __`res`__ ponse body using the __`end`__ function
* Have node __`listen`__ on a suitable __`HOST`__ IP address and __`PORT`__
* Add a __`log`__ line to feedback to the __`console`__
* Save the file as __server\.js__ in __ActivityFiles__  __/01\_IntroducingNode/starter__
* Start __node\,__ passing it the __server__ file
* Open your browser and check you can connect to the server

### Step-by-step - verbose

**Outcome:** To use your code editor to create a simple server

1.  Create a file called **server.js** in the **01_IntroducingNode/starter** folder.
2.  Use the `require` method to access the `http` object:

```js
const http = require('http');
```

3.  Define **constants** for `PORT` and `HOST` set to `4000` and `'localhost'` respectively:

```js
const PORT = 4000;\
const HOST = `localhost`;
```

4.  Instantiate a server with a *request* and *response* parameter:

```js
http.createServer((req, res) => {})
```

5. Write an appropriate *mime* type to the head:

```js
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain'} );
});
```

6. Create a *simple message* to *return* in the *response body* using the `end` function:

```js
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain'} );
  res.end(`Hello World`);
})
```

7. Have node `listen` on `HOST` and `PORT`:

```js
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain'} );
  res.end(`Hello World`);
}).listen(PORT, HOST);
```

8. Add a `log` line to feedback to the console:

```js
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain'} );
  res.end(`Hello World`);
  console.log(`Server at http://${HOST}:${PORT}`);
}).listen(PORT, HOST);
```

9. Save the file (as **server.js**).

10. Start the server by typing the following line on a command line pointed at the 01_IntroducingNode/starter folder:

```sh
node server.js
```

11. Open your browser at [http://localhost:4000](http://localhost:4000) and check the server connection.

>This is the end of this activity.

---

## Activity 4 - Building a Server with Express

### Short Instructions

* Install `express` and `dotenv` using `npm`
* Create a new server in the a new file called **server.js** in __02_NodeWithExpress**/starter__.
* Add code to:
  * `require` `dotenv` and call `config()`
  * Declare a `const` `express` set to a `require` for `express`
  * Declare a `const` `app` set to a call to `express()`
  * Declare a `const` `port` set to `process.env.PORT`
  * Declare a `const` `host` set to `process.env.HOST`
  * Make a call of `get` on `app` , passing in `/` and a callback that takes `req` and `res` making a call to `send` on `res` , passing in `Hello World`
  * Declare a `const`  `server` that is a call to `app.listen` , passing in `port`, `host` and a callback that:
    * Sets a `const`  `SERVERHOST` to a call to `address()` on `server` , accessing its `address` property
    * Sets a `const`  `SERVERPORT` to a call to `address()` on `server` , accessing its `port` property
    * Logs out the `SERVERHOST` and `SERVERPORT` for the `server`
* Create a **.env** file and add:
  * `PORT=4000`
  * `HOST=localhost`
* Stop any previous server instance and run this instead, checking the output is as expected, e.g.

```sh
Server is running on http://127.0.0.1:4000
```

### Step-by-step -- verbose

1.  Create a new server file called **server.js** in the **02_NodeWithExpress/starter** folder.

2.  Point the command line to this folder and install **express** AND **dotenv** using:

```sh
npm i \--save express dotenv
```

3. In **server.js**:
- `require` `dotenv` and call `config()`

```js
require('dotenv').config();
```

- Declare a **const** `express` set to a `require` for `express`:

```js
const express = require(\`express\`);
```

- Declare a **const** `app` set to a call to `express()`:

```js
const app = express();
```

- Declare a **const** `port` set to `process.env.PORT` and `host` set to `process.env.HOST`:

```js
const port = process.env.PORT;
const host = process.env.HOST;
```

- Make a call of `get` on `app`, passing in `/` and a callback that takes `req` and `res` returning a call to `send` on `res`, passing in `Hello World`:

```js
app.get(`/`, (req, res) => res.send(`Hello World`));
```

- Declare a `const` `server` that is a call to `app.listen`, passing in `port`, `host` and a *callback* that:
  
  - Sets a `const` `SERVERHOST` to a call to `address()` on `server`,  accessing its `address` property;
  - Sets a `const` `SERVERPORT` to a call to `address()` on `server`, accessing its `port` property;
  - Logs out the **host** and **port** for server:

```js
const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is runnning on http://${SERVERHOST}:${SERVERPORT}`);
});
```

4. Stop any previous server instances and run this instead by pointing the command line at **02_NodeWithExpress/starter** and running:

```
nodemon server.js
```

6. Check that the output is OK - you should see `Hello World` on (http://localhost:4000).

>This is the end of this activity.

---