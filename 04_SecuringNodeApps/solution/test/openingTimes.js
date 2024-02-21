import OpeningTime from '../models/openingTime.model.js';

import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import server from '../server.js';

import testData from './testData/sampleOpenings.js';

const TESTPATH = `/openingTimes`;

chai.use(chaiHttp);

describe(`Test of retrieving opening times`, () => {
    beforeEach(async () => {
        await OpeningTime.deleteMany()
            .then(() => console.log(`Database cleared`))
            .catch(error => {
                console.log(`Error clearing`);
                throw new Error();
            });

        await OpeningTime.insertMany(testData)
            .then(() => console.log(`Database populated with test Data`))
            .catch(error => {
                console.log(`Error inserting`);
                throw new Error();
            });
    });

    it(`should retrieve all of the sample opening times`, async () => {
        const res = await chai.request(server)
            .get(TESTPATH)
            .send();

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.eql(testData.length);
    });
});