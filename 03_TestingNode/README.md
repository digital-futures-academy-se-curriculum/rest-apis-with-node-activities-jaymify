# Testing Node using JavaScript

## Activity 16 - Setting up integration testing - Part 1

These instructions should be carried out with 02_NodeWithExpress/starter as the root folder.
The NodeJS and MongoDB servers should be running.

### Action 1 - Set Up the environment

Use the steps above to set up your environment.

1. Create the `.env.<NAME>` files
2. Update the app so it detects the different environments (both `index.js` and `package.json`)
3. Install the modules needed for testing
4. Create a `test` folder

### Action 2 - Create a test file

1. In the `test` folder, create a file called **serverTest.js**
2. Import the following testing dependencies:
   - `chai` as `chai`
   - `chai-http` as `chaiHttp`
3. Call `use` on `chai` passing in `chaiHttp` to give **chai** access to the *plugin*
4. Create a test suite (using `describe` that has the title of `Tests` and an empty callback)

**Solution:**
<details>

```js
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe(`Tests`, () => {});
```
</details>

5. Save the file and open the project root in the terminal.
6. Use `npm test` to make sure that `0` tests run

>This is the end of this activity.

---

## Activity 17 - Setting up integration testing - Part 2

### Action 1 - Create a testing database

**Note:** These actions are to ensure that a database is present but are not necessary.  Mongoose and MongoDB between them will create a database if one is not found in the connection string.

#### Method 1 - Compass

In Compass, create a new database with the name of `todos-test` and a collection of `todos`

Don't worry about populating it with data - we'll do that in the tests.

#### Method 2 - `mongosh`

Access the Mongo shell and execute the following commands:

```mongosh
use todos-test
db.createCollection('todos')
```

### Action 2 - Extend the test file

Use the information above to:

1. Require all of the necessary modules and data for the tests
2. Create a suite for route tests
3. Construct an asynchronous `beforeEach` method that empties the test database and then populates it with the supplied sample data
4. Write a spec that makes a GET call to the home route
5. Run the tests using `npm test`

---

## Making Assertions on the results

In the test we need to obtain the result of making the call.

The code in the stub `it` test before makes **Chai** *spin up* the server and then makes a `get` request to it and returns the result in `send`.

Accessing the result can be done by simply assigning a const to the result of the request. This is usually defined as `res` to represent the response.

Assertions can then be made on `res` - in particular on the `body` of this object.

```js
  it(`tests something for a get request`, async () => {
    const res = await chai.request(server).get(`/`).send();

    expect(res).to.have.status(200);
    expect(res.body.length).to.be.eql(sampleData.length);
  });
```

>This is the end of this activity.

---

## Activity 18 - Create the todo route tests

Create tests for all of the routes in the Todo API.

These are:

| Route  | Request Type | Expected Result                                           |
| ------ | ------------ | --------------------------------------------------------- |
| `/`    | GET          | Sample Data is identifiably returned                      |
| `/`    | GET          | 404 returned when no data                                 |
| `/:id` | GET          | Requested todo is identifiably returned                   |
| `/:id` | GET          | 404 returned when todo is not found                       |
| `/`    | POST         | New todo is created with good data                        |
| `/`    | POST         | 400 returned when bad data is sent (may be several tests) |
| `/:id` | PUT          | Requested todo is identifiably updated with good data     |
| `/:id` | PUT          | 404 returned when bad data is sent (may be several tests) |

>All of your tests should pass at the end of the activity!

>This is the end of the activity

---