# Node with Express

## Activity 4 - Building a Server with Express

### Short Instructions

* Install `express` and `dotenv` using `npm`
* Create a new server in the a new file called **server.js** in __02_NodeWithExpress**/starter__.
* Add code to:
  * Import `dotenv` and call `config()` on it
  * Import `express` from `express`
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
- `import` `dotenv` and call `config()`

```js
import dotenv from 'dotenv';

dotenv.config();
```

- Import `express` from `express`:

```js
import express from 'express';
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

## Activity 5 - Install MongoDB Community Server

- Go to [https://www\.mongodb\.com/download\-center/community](https://www.mongodb.com/download-center/community)
- Download the appropriate version for your system
- Follow the installation instructions
- Follow the instructions for making a __/data/db__ directory
- Start __mongod__
- Start __mongo__ \(in a separate command line window\)

>This is the end of this activity.

---

## Activity 6 - Import some sample todos into MongoDB

1.  Navigate to the folder **02_NodeWithExpress/starter** on the command line (it is the folder with **sampleTodos.json** in it).

2.  Import the **sampleTodos.json** file into MongoDb using the command:

```sh
mongoimport --db todos --collection todos --file sampleTodos.json
```

3. Check that the import has been successful by:
   
- Running the command `mongo` on the command line and switching to `todos` using:

```js
use todos
```

- Ensuring the imported data can be found by running the command:

```js
db.todos.find()
```

4. Check the output matches:

![Sample todos in Mongo Shell](../../docs/img/sampleTodosInMongoShell.png)

>This is the end of this activity.

---

## Activity 7 - Create a Todo Schema

These instructions should be carried out with 02_NodeWithExpress/starter as the root folder.

### Short Instructions

* Install __mongoose__ for the project using __npm__  __i__  __\-\-save mongoose__
* In the same folder as __server\.js__ \, create a new file called __todo\.model\.js__
* Import  `mongoose` from `mongoose`
* Set a `const`  `todoSchema` to be a `new mongoose.Schema` who’s *config object* has key value pairs:
  * Key: `todoDescription` , Value: `{ type: String, required: true }`
  * Key: `todoDateCreated` , Value: `{ type: Date, default: Date.now, required: true }`
  * Key: `todoCompleted` , Value: `{ type: Boolean }`
* Set a `const` called `Todo` set to a call to `mongoose.model` with `Todo` (as a String) `todoSchema` as arguments
* **Export** `Todo` as a `default`
* Save the file

```js
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    todoDescription: { type: String, required: true },
    todoDateCreated: { 
                       type: Date, 
                       default: Date.now, 
                       required: true
                     },
    todoCompleted: { type: Boolean }
});

const Todo = mongoose.model(`Todo`, todoSchema);

export default Todo
```


>This is the end of this activity.

---

## Activity 8 - Connect the server to the database

### Steps

1. Open **.env** and add a variable `DB_URI` set to the address of your MongoDB server's **todos** database, usually `mongodb://localhost:27017/todos`
2. Save this file.
3. Open **server.js** and add a `require` statement for `mongoose`.
4. Before the `app.get` call, define an `async` arrow function called `main`, it:

- Takes no arguments
- Logs out that it is connecting to the database at the supplied `DB_URI`
- `await`s a call to `mongoose.connect` passing in `DB_URI` from the **.env** file

5. Call `main` and chain a `catch` that receives and logs out an error.
6. Save the file.
7. Make sure that your MongoDB server is not running and use `nodemon` to run your **server.js** file

> You should see an error message after a short while when the attempt to connect to MongoDB times out

8. In a separate terminal, start your MongoDB server and re-run your NodeJS server

> You should not receive the error message!

>This is the end of this activity

---

## Activity 9 - Create a Route for all todos

These instructions should be carried out with **02_NodeWithExpress/starter** as the root folder.

### Short Instructions

1. Create a new folder called __routes__ and create a file called __alltodos.js__ inside it:
- Import  __`express`__ from __`express`__
- **Export** a __`const`__  __`router`__ to __`express.Router()`__
- Call __`route`__ on __`router`__ passing __`\`__ and then chain a __`.get`__ call
  - The callback function in __`get`__ should receive __`req`__ and __`res`__ and __`return`__  __`res.send`__ the string __`Getting all todos`__
2. Export the module router: __`module.exports = router`__ ;
3. Save the file.

4. Open __server\.js__ and add the following code:
- Import the `router` as  __`allTodos`__ from  __`./routes/alltodos.js`__
- Comment out the current __`app.get`__ call
- Add a call to __`use`__ on __`app`__ with __`/`__ (as a string) and __`allTodos`__ as the arguments:

```js
app.use(`/`, allTodos);
```

1. Save all files and check that the message is displayed when visiting [http://localhost:4000](http://localhost:4000)

### Step-by-Step Instructions

1.  Open **02_NodeWithExpress/starter/server.js** for editing.
2.  Import `{ router as allTodos }` from `./routes/alltodos.js`:

```js
import { router as allTodos } from (`./routes/alltodos.js`);
```

3.  Comment out the current `app.get` call.

4.  Add a call to `use` on `app` with `/todos` and `allTodos` as the arguments:

```js
app.use(`/todos`, allTodos);
```

5.  Save the file.

6.  Create a new folder called **routes** and create a file called **alltodos.js** inside it.

7.  Open **alltodos.js** for editing.

8. Import `express` from `express`:

```js
import express from 'express';
```

9.  **Export** a `const` `router` to `express.Router()`:

```js
export const router = express.Router();
```

10. Call `route` on `router` passing `/` and then chain a `.get` call:

```js
router.route(`/`).get();
```

11. The callback function in `get` should receive `req` and `res` and return `res.send(`Getting all todos`)`:

```js
router.route(`/`).get((req, res) => {
  res.send(`Getting all todos`);
});
```

13. Save all files and check that the correct message is displayed on the page when visiting <http://localhost:4000/todos>.


>This is the end of this activity.

---

## Further Route Requirements and Acceptance Criteria

![Acceptance Criteria for getting single todo](../../docs/img/AcceptanceCriteriaTodoRoute.png)
![Acceptance Criteria for updating a new todo](../../docs/img/AcceptanceCriteriaPOST.png)

Both of the above could be in a file called **singleTodo**
Both on a `route` of `/todo/:id`
One is a **GET** request
One is a **POST** request (should it really be a **PUT**?)


![Acceptance Criteria for adding a new Todo](../../docs/img/AcceptanceCriteriaAddTodo.png)

In a file called **addTodo**
On a `route` of `/add`
Is a **POST** request

---

## Activity 10 - Add more routes

The Activities continue using the **02_NodeWithExpress/starter** folder.

### Shorter Instructions

* Create the files for __singleTodo__ and __addTodo__ in the **routes** folder
* For the __router\.route__ for __singleTodo__ \, use the parameterised route __\`/:id\`__
  * In the __\.get\(\)__ callback
    * Set a __const__  __id__ to __req\.params\.id__
    * __send__ a __res__ ponse confirming the __id__ of the todo to be obtained
  * In the __\.post\(\)__ callback
    * Set a __const__  __id__ to __req\.params\.id__
    * __send__ a __res__ ponse confirming the __id__ of the todo to be updated
* For the __router\.route__ of __addTodo__ \, use the route __\`/\`__
  * In the __\.post\(\)__ callback\, __send__ a __res__ ponse __\`__  __Todo__  __successfully added\`__
* Add the routing information to __server\.js__ following the pattern for __allTodos__

### Verbose Instructions

#### `singleTodo`

1.  Create a file in the **routes** folder called **singleTodo.js**.

2. Import `express` from `express`:

```js
import express from 'express';
```

3. **Export** a `const` `router` to `express.Router()`:

```js
export const router = express.Router();
```

4. Call `route` on `router` passing the parameterised route `/:id` and then chain a `.get` call:

```js
router.route(`/:id`).get()
```

5. The callback function in get should:
  - Set a `const` `id` to `req.params.id`;
  - Send a *response* confirming the *id* of the *todo* to be obtained:

```js
router.route(`/:id`).get((req, res) => {
  const id = req.params.id;
  res.send(`Obtaining todo with id: ${id}`);
});
```

6.  Add a `post` call to the chain for updating the todo:

```js
router.route(`/:id`)
  .get((req, res) => {
    const id = req.params.id;
    res.send(`Obtaining todo with id: ${id}`);
  })
  .post();
```
7. The callback function in `post` should:
   - Set a `const` of `id` to `req.params.id`;
   - Send a *response* confirming the *id* of the *todo* to be updated:


```js
...
  .post((req, res) => {
    const id = req.params.id;
    res.send(`Updating todo with id: ${id}`);
  });
```

9. Save the file.

#### `addTodo`

1.  Create a file in the **routes** folder called **addTodo.js**.
2.  Import `express` from `express`:

```js
import express from 'express';
```
3. Export a `const` `router` to `express.Router()`:

```js
export const router = express.Router();
```

4. Call `route` on `router` passing the parameterised route `/` and then chain a `.post` call whose callback function sends a response of `Todo successfully added`:

```js
router.route(`/`)
  .post((req, res) => {
  res.send(`Adding Todo`);
});
```

6. Save the file.

#### Update routing information in server.js

1.  Open **server.js** for editing.
2.  Under the initialisation of constants, add:
    - A `const` `singleTodo` to `require` `./routes/singleTodo` (as a string);
    - A `const` `addTodo` to `require` `./routes/addTodo` (as a string);

```js
const singleTodo = require(`./routes/singleTodo`);
const addTodo = require(`./routes/addTodo`);
```

3. Before the first call to `app.use`, add:
   - A call to `app.use` with arguments `/add` (as a string) and `addTodo`;
   - A call to `app.use` with arguments `/todo` (as a string) and `singleTodo`:

```js
app.use(`/add`, addTodo);
app.use(`/todo`, singleTodo);
app.use(`/`, allTodos);
```
4. Save the file and check the following routes give the desired output:
   - <http://localhost:4000> outputs **Getting all todos**;
   - <http://localhost:4000/todo/1> outputs **Obtaining todo with id: 1**

>This is the end of this activity

---

## Activity 11 - Downloading and Installing Postman

Visit [http://getpostman\.com/downloads](http://getpostman.com/downloads) and obtain appropriate version

Install and run!

>This is the end of this activity.

---

## Activity 12 - Make some GET and POST requests

These instructions should be carried out with 02_NodeWithExpress/starter as the root folder.
The NodeJS server should be running.

### Action 12.1 - GET Request - all todos

1. Ensure GET is selected for the request type
2. Enter the address to make the request to `http://localhost:4000`
3. Click Send
4. Observe the result

![GET test result 1](../../docs/img/PostmanGETTest1.png)

### Action 12.2 - GET Request - single todo

5. Make a GET request to `http://locahost:4000/todo/1`
6. Click Send
7. Observe the result

![GET test result 2](../../docs/img/PostmanGETTest2.png)

### Action 12.3 - POST Request - add todo

1. Ensure POST is selected for the request type
2. Enter the address to make the request to `http://localhost/add`
3. Click send
4. Observe the result

![POST test result 1](../../docs/img/PostmanPOSTTest1.png)

5. Make a POST request to `http://localhost/todo/1`
6. Click send
7. Observe the result

>This is the end of this activity.

---

## Activity 13 - Make Requests for Data

These instructions should be carried out with 02_NodeWithExpress/starter as the root folder.
The NodeJS and MongoDB servers should be running.

### Action 13.1 - Return data for all Todos

* Import `Todo` from `../todo.model`
* Change the __`route`__ information for __`'/'`__ in __`allTodos`__
  * In the __`.get`__ function, replace __`res.send()`__ with:
    * A call to __`find()`__ on __`Todo`__
      * __`find`__ has an argument of a callback that takes __`error`__ and __`todos`__
        * If an __`error`__ is found it should __`return`__  __`res.status(404).send("Not found")`__
        * If no error is found it should __`return`__  __`res.json(todos)`__

**Solution:**
<details>

```js
router.route(`/`).get((req.res) => {
    // res.send(`Getting all todos`);
    Todo.find((error, todos) => {
        error ? res.status(404).send(`Not found`) : res.json(todos);
    });
});
```

</details>

### Action 13.2 - Return data for add Todo

* Install the **body-parser** package
* Import `bodyParser` into the **index** file
* Tell `app` to `use` the argument `bodyParser.json()`
* Save this file
* Import `Todo` from `../todo.model`
* Change the __`route`__ information in __`addTodo`__
  * Replace __`res.send()`__ with:
    * A __const__  __todo__ set to a __new__  __Todo__ passing in __req.body__
    * A call to __`save()`__ on __`todo`__
    * A chained __`then`__ with a callback that takes __`todo`__ and __`return`__ s __`res.status(200)`.__  __`json({"todo" : "todo added"});`__
    * A chained __`catch`__ with a callback that takes __`error`__ and __`return`__ s __`res.status(400).send("Add failed");`__

**Solution:**
<details>

From the same folder that contains **package.json** run: `npm i body-parser`

The code should be modified to include:

```js

//index.js

import BodyParser from 'body-parser';
...
app.use(bodyParser.json());
...

// alltodos.js

router.route(`/`).post((req.res) => {
    // res.send(`Adding Todo`);
    const todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json(
                { 'todo': `todo added successfully`}
            );
        })
        .catch(err => res.status(400).send(`Adding new todo failed`));
});
```
</details>

### Action 13.3 - Return data for getting a single Todo

* Import `Todo` from `../todo.model`
* Change the __`route`__ information for getting __`'/:id'`__ in __`singleTodo`__
  * In the __`.get`__ function, replace __`res.send()`__ with:
    * A __`const`__  __`id`__ set to __`req.params.id`__
    * A call to __`findById`__ on __`Todo`__ , passing in __`id`__ and a callback that takes __`error`__ and __`todo`__
      * If __`todo`__ is __`false`__ , __`return`__  __`res.status__  __(404).send("Not found");`__
      * Otherwise __`return`__  __`res.json(todo)`__
      * 
**Solution:**
<details>

```js
router.route(`/:id`)
    .get((req.res) => {
        // res.send(`Obtaining todo with id: ${id}`);
        Todo.findById(id, (error, todo) => {
            if (!todo) {
                res.status(404).send(`That todo cannot be 
                  found`);
            } else {
                res.json(todo);
            }
        });
    })
```
</details>

### Action 13.4 - Return data after updating Todo

* Change the __`route`__ information for posting to __`'/:id'`__ in __`singleTodo`__
  * In the __`.post`__ function replace __`res.send()`__ with:
    * The steps to __`return`__ the __`todo`__
    * Change the __`return`__  __`res.json(todo)`__ so that:
      * It sets the __`keys`__ for the __`todo`__ to the __corresponding keys__ in __`req.body`__
      * Calls __`save`__ on __`todo`__
      * Chains __`then`__ with a callback that takes __`todo`__ and __`return`__ s __`res.json("Updated");`__

**Solution:**
<details>

```js
router.route(`/`)
    .get((req, res) => {
        // As Action 13.3
    })
    .post((req.res) => {
        const id = req.params.id;
        // res.send(`Updating todo with id: ${id}`);
        Todo.findById(id, (error, todo) => {
            if (!todo) {
                res.status(404).send(`That todo cannot be 
                  found`);
            } else {
                todo.todoDescription = req.body.todoDescription;
                todo.todoDateCreated = req.body.todoDateCreated;
                todo.todoCompleted = req.body.todoCompleted;
                todo.save()
                    .then(todo => res.json(`Todo updated!`))
                    .catch(err => res.status(400).send(`Update not 
                      possible`));
            }

        });
    });
```
</details>

>This is the end of this activity.

---

## Acceptance Criteria for Testing

The following criteria have been added to the Acceptance Criteria for each request made:

![Get all Todos Test](../../docs/img/TestingAcceptance1.png)

![Add Todo Test](../../docs/img/TestingAcceptance2.png)

![Get single Todo Test](../../docs/img/TestingAcceptance3.png)

![Update Todo Test](../../docs/img/TestingAcceptance4.png)

---

## Activity 14 - Create Postman Tests

These tests should be carried out with 02_NodeWithExpress/starter as the root folder.
The NodeJS and MongoDB servers should be running.

Test your API using Postman using the following information:

| Request Type | Request Address                                                            | Request body (raw) | Expected Output              |
| ------------ | -------------------------------------------------------------------------- | ------------------ | ---------------------------- |
| `GET`        | `http://locahost:4000`                                                     | None               | List of todos (JSON)         |
| `GET`        | `http://localhost:4000/todo/<todoId>` *(copied from previous test result)* | None               | Individual todo as JSON      |
| `POST`       | `http://localhost:4000/todo/<todoId>` *(copied from previous test result)* | See 3 below        | Updated (as string)          |
| `POST`       | `http://localhost:4000/add`                                                | See 4 below        | `{todo: todo added}` as JSON |

**3:**
<details>

```json
{
  "todoDescription": <from chosen todo>,
  "todoDateCreated": <from chosen todo>,
  "todoCompleted": "true"
}
```
</details>

**4:**
<details>

```json
{
  "todoDescription": "New todo",
  "todoDateCreated":"2019-05-27T00:00:00.000Z",
  "todoCompleted": "false"
}
```
</details>

>This is the end of this activity.

---

## Activity 15 - Connecting to the React Todos App

Once you have a server that handles the requests that an app might make, it is time to integrate the systems.

An example of this would be to connect the React Todos App with the Todos API that has been created to service this application.

These are the steps that you will need to make:

### Action 15.1 - Review Updated React App

This documents the changes made to get the app to work with the server:

1. Start with the [ReactTodoApp](../activity-files/ReactTodoApp/solution/) React Application.
2. Update `.env` so that `REACT_APP_TODOSURL=http://localhost:4000`
3. Update `App.js` 
   - make the `submitTodo` function send its request to `${process.env.REACT_APP_TODOSURL}/add`
   - make the `updateTodo` function send its request to `${process.env.REACT_APP_TODOSURL}/todo/${todo._id}`
4. Update `PropTypes` in `AllTodos.jsx` and `TodoForm.jsx`
   - change the `exact` keyword to `shape`
     - MongoDB adds some other fields to objects created from documents in collections - this makes PropTypes ignore them
5. Update `AddEditTodo` so that the `submitTodo` function just sets `id` to `todoId` - remove `?? generateTodoId()` from the statement and remove the import for `generatedTodoId()`;

> If you save the files and run the application now (along with having the NodeJS server and MongoDB running), you will find that there is a **CORS** issue.  [**Cross-Origin Resource Sharing**](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is a mechanism to protect domains from receiving unwanted requests from *origins* (i.e. other servers).  You can configure **CORS**, for example, to *whitelist* certain *origins* or allow requests from any *origin*.

### Action 15.2 - Fix CORS on the Server

1. In the NodeJS server folder, install the `npm` `cors` package.
2. In `server.js`, import `cors` from `cors`.
3. Before the current `app.use` statements, add another: `app.use(cors())`
4. Save the file and restart the server.

> If you try to run the React App now, you should find that the Todos are displayed on the home route and that you can add a Todo.

> However, if you try to update a Todo, this fails with a 404 request UNLESS you have dealt with a PUT request on the `/todo/:id` route, if you haven' follow the steps below

### Action 15.3 - Fix the missing PUT request on the Edit Todo route

1. Open `routes/singleTodo.js` and change the `.post` to `.put`
2. Save the file and restart the server

> Now trying to edit a Todo produces a successful message and the Todo is updated in the AllTodos view

>This is the end of this activity. 

---
