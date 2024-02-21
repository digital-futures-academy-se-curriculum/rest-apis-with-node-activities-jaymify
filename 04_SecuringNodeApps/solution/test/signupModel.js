import Signup from '../models/signup.model.js';

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import assert from 'assert';

import testData from './testData/sampleSignup.js';

const should = chai.should();

chai.use(chaiHttp);

describe(`Test the database model`, () => {
    describe(`Test the required fields for presence and validity`, () => {
        it(`should reject empty required values`, done => {
            const testServer = chai.request(server).keepOpen();
            const testSignup = new Signup(
                testData.onlyRequiredNoData
            );
            const error = testSignup.validateSync();
            error.errors[`title`].should.have.property(`message`, `No title supplied`);
            error.errors[`firstName`].should.have.property(`message`, `No first name supplied`);
            error.errors[`lastName`].should.have.property(`message`, `No last name supplied`);
            error.errors[`email`].should.have.property(`message`, `No email supplied`);
            done();
        });

        it(`should reject invalid required values`, done => {
            const testServer = chai.request(server).keepOpen();
            const testSignup = new Signup(
                testData.onlyRequiredInvalid
            );
            const error = testSignup.validateSync();

            error.errors[`title`].should.have.property(`message`, `Not a valid title`);
            error.errors[`firstName`].should.have.property(`message`, `First name is not long enough`);
            error.errors[`lastName`].should.have.property(`message`, `Last Name is not long enough`);
            error.errors[`email`].should.have.property(`message`, `Invalid Email format`);
            done();
        });

        it(`should accept valid required values`, done => {
            const testServer = chai.request(server).keepOpen();
            const testSignup = new Signup(
                testData.onlyRequired
            );
            const error = testSignup.validateSync();
            assert.equal(error, null);
            done();
        });
    });
});
