import Signup from '../models/signup.model.js';

import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import server from '../server.js';

import testData from './testData/sampleSignup.js';
import {
    randomValidTitle,
    randomValidFirstName,
    randomValidLastName,
    randomValidEmail,
    randomValidPhoneNumber,
    randomValidDob,
    randomValidGender,
    randomValidSignup,
} from './testData/sampleSignup.js';

const TESTPATH = `/signup`;

chai.use(chaiHttp);

describe(`Test sign up system`, () => {
    beforeEach(async () => {
        await Signup.deleteMany()
            .then(() => console.log(`Database cleared`))
            .catch(error => {
                console.log(`Error clearing`);
                throw new Error();
            });
    });

    describe(`Test POST data required errors`, () => {
        it(`should not create a signup without a title field`, async () => {
            const signup = testData.noTitle;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(signup);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property(`error`);
            expect(res.body).to.have.property(`message`, `There were errors in the sign up data`);
        });

        it(`should not create a signup without a firstName field`, async () => {
            const signup = testData.noFirstName;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(signup);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property(`error`);
            expect(res.body).to.have.property(`message`, `There were errors in the sign up data`);
        });

        it(`should not create a signup without a lastName field`, async () => {
            const signup = testData.noLastName;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(signup);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property(`error`);
            expect(res.body).to.have.property(`message`, `There were errors in the sign up data`);
        });

        it(`should not create a signup without an Email field`, async () => {
            const signup = testData.noEmail;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(signup);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property(`error`);
            expect(res.body).to.have.property(`message`, `There were errors in the sign up data`);
        });

        it(`should create a signup if only title, firstName, lastName and email are valid and present`, async () => {
            const signup = new Signup(testData.onlyRequired);
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(signup);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property(`message`, `Sign up successful`);
        });
    });

    describe(`Test POST validity`, () => {
        describe(`Title Validity tests:`, () => {
            it(`should reject an invalid title`, async () => {
                const signup = testData.invalidTitle;
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(422);
                expect(res.body).to.have.property(`error`);
                expect(res.body).to.have.property(`message`, `There were errors in the sign up data`);
            });

            it(`should accept a valid title`, async () => {
                const signup = randomValidTitle();
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(200);
                expect(res.body).to.have.property(`message`, `Sign up successful`);
            });
        });

        describe(`FirstName Validity tests:`, () => {
            it(`should reject a firstName of less than 2 chars`, async () => {
                const signup = testData.invalidFirstName;
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(422);
                expect(res.body).to.have.property(`error`);
                expect(res.body).to.have.property(`message`, `There were errors in the sign up data`);
            });

            it(`should accept a valid firstName`, async () => {
                const signup = randomValidFirstName();
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(200);
                expect(res.body).to.have.property(`message`, `Sign up successful`);
            });
        });

        describe(`LastName Validity tests:`, () => {
            it(`should reject a lastName of less than 2 chars`, async () => {
                const signup = testData.invalidLastName;
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(422);
                expect(res.body).to.have.property(`error`);
                expect(res.body).to.have.property(`message`, `There were errors in the sign up data`);
            });

            it(`should accept a valid lastName`, async () => {
                const signup = randomValidLastName();
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(200);
                expect(res.body).to.have.property(`message`, `Sign up successful`);
            });
        });

        describe(`Email Validity tests:`, () => {
            it(`should reject an email not in the specified format`, async () => {
                const signup = testData.invalidEmail;
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(422);
                expect(res.body).to.have.property(`error`);
                expect(res.body).to.have.property(`message`, `There were errors in the sign up data`);
            });

            it(`should accept a valid lastName`, async () => {
                const signup = randomValidEmail();
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(200);
                expect(res.body).to.have.property(`message`, `Sign up successful`);
            });
        });

        describe(`PhoneNumber Validity tests:`, () => {
            it(`should reject a phoneNumber in an invalid format if present`, async () => {
                const signup = testData.invalidPhoneNumber;
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(422);
                expect(res.body).to.have.property(`error`);
                expect(res.body).to.have.property(`message`, `There were errors in the sign up data`);
            });

            it(`should accept a valid phoneNumber if present`, async () => {
                const signup = randomValidPhoneNumber();
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(200);
                expect(res.body).to.have.property(`message`, `Sign up successful`);
            });
        });

        describe(`Dob Validity tests:`, () => {
            it(`should reject a dob in an invalid format if present`, async () => {
                const signup = testData.invalidDob;
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(422);
                expect(res.body).to.have.property(`error`);
                expect(res.body).to.have.property(`message`, `There were errors in the sign up data`);
            });

            it(`should accept a valid dob if present`, async () => {
                const signup = randomValidDob();
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(200);
                expect(res.body).to.have.property(`message`, `Sign up successful`);
            });
        });

        describe(`Gender Validity tests:`, () => {
            it(`should reject a gender that is not female or male`, async () => {
                const signup = testData.invalidGender;
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(422);
                expect(res.body).to.have.property(`error`);
                expect(res.body).to.have.property(`message`, `There were errors in the sign up data`);
            });

            it(`should accept a valid gender if present`, async () => {
                const signup = randomValidGender();
                const res = await chai.request(server)
                    .post(TESTPATH)
                    .send(signup);

                expect(res).to.have.status(200);
                expect(res.body).to.have.property(`message`, `Sign up successful`);
            });
        });

        it(`should accept valid signup data if all are present`, async () => {
            const signup = randomValidSignup();
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(signup);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property(`message`, `Sign up successful`);
        });
    });
});