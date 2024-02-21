import Todo from '../todo.model.js';

// Require the testing dependencies
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';

// Require other code for testing
import server from '../server.js';
import testData from './testData/sampleTodos.js';
const testDataArray = testData.todos;

chai.use(chaiHttp);
describe(`Testing requests on the database`, () => {

    beforeEach(async () => {
        await Todo.deleteMany()
            .then(() => console.log(`Database cleared`))
            .catch(error => {
                console.log(`Error clearing`);
                throw new Error();
            });

        await Todo.insertMany(testDataArray)
            .then(() => console.log(`Database populated with test Todos`))
            .catch(error => {
                console.log(`Error inserting`);
                throw new Error();
            });
    });

    describe(`/GET todo`, () => {
        it(`should return all of the todos as an array`, async () => {
            const res = await chai.request(server)
                .get(`/`)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an(`array`);
            expect(res.body.length).to.be.eql(testDataArray.length);
        });
    });

    describe(`/POST create a todo`, () => {
        it(`should not create a todo without a description field`, async () => {
            let todo = {
                todoDateCreated: `2019-05-27T00:00:00.000Z`,
                todoCompleted: false
            };

            const res = await chai.request(server)
                .post(`/add`)
                .send(todo);

            expect(res).to.have.status(400);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new todo failed`);
        });

        it(`should create a todo that is properly formed`, async () => {
            let todo = {
                todoDescription: `A test todo`,
                todoDateCreated: `2019-05-27T00:00:00.000Z`,
                todoCompleted: false
            };

            const res = await chai.request(server)
                .post(`/add`)
                .send(todo)

            expect(res).to.have.status(200);
            expect(res.body).to.be.an(`object`);
            expect(res.body).to.have.property(`todo`, `todo added successfully`);
        });
    });

    describe(`/GET/:id todo`, () => {
        it(`should GET a todo by the given id`, async () => {
            const testId = testDataArray[0]._id;
            const res = await chai.request(server)
                .get(`/todo/${testId}`)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.have.property(`_id`, testId);
        });
    });

    describe(`/PUT/:id update existing todo`, () => {
        it(`should update a todo with PUT for the given id`, async () => {
            const todoToUpdate = testDataArray[0];
            todoToUpdate.todoCompleted = true;

            const res = await chai.request(server)
                .put(`/todo/${todoToUpdate._id}`)
                .send(todoToUpdate);

            expect(res).to.have.status(200);
            console.log(res.body);
            expect(res.body).to.be.a(`string`).eql(`Todo updated!`);
        });

        it(`should return a 404 error if the todo to update is not found`, async () => {
            const res = await chai.request(server)
                .put(`/todo/notAnId`)
                .send({});

            expect(res).to.have.status(404);
            expect(res.text).to.be.eql(`That todo cannot be found`);
        });
    });
});