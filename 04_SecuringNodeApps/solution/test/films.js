import Film from '../models/film.model.js';

import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import server from '../server.js';

import testData from './testData/sampleFilms.js';

const TESTBASEPATH = `/allFilms`;

chai.use(chaiHttp);

describe(`Test of retrieving films film`, () => {
    beforeEach(async () => {
        await Film.deleteMany()
            .then(() => console.log(`Database cleared`))
            .catch(error => {
                console.log(`Error clearing`);
                throw new Error();
            });

        await Film.insertMany(testData.films)
            .then(() => console.log(`Database populated with sampleTrainerData`))
            .catch(error => {
                console.log(`Error inserting`);
                throw new Error();
            });
    });

    describe(`Test allFilms methods`, () => {
        const TESTBASEPATH = `/allFilms`;

        it(`should retrieve all of the films when /allFilms is hit`, async () => {
            const res = await chai.request(server)
                .get(TESTBASEPATH)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(testData.films.length);

        });

        it(`should retrieve all films with status 1 when /allFilms/1 is hit`, async () => {
            const res = await chai.request(server)
                .get(`${TESTBASEPATH}/1`)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            console.log(testData.films.filter(film => film.filmStatus === `1`));
            expect(res.body.length).to.be.eql(testData.films.filter(film => film.filmStatus === `1`).length);

        });

        it(`should retrieve all films with a status if 2 when /allFilms/2 is hit`, async () => {
            const res = await chai.request(server)
                .get(`${TESTBASEPATH}/2`)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            console.log(testData.films.filter(film => { console.log(film); return film.filmStatus === `2` }));
            expect(res.body.length).to.be.eql(testData.films.filter(film => film.filmStatus === `2`).length);
        });

        it(`should return a 422 status when anything other than 1 or 2 is supplied to allFilms/:status`, async () => {
            const res = await chai.request(server)
                .get(`${TESTBASEPATH}/not1or2`)
                .send();

            expect(res).to.have.status(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message', `Not a valid film status`);
        });

        it(`should return a 422 status when a number not 1 or 2 is supplied to allFilms/:status`, async () => {
            const res = await chai.request(server)
                .get(`${TESTBASEPATH}/4`)
                .send();

            expect(res).to.have.status(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message', `Not a valid film status`);
        });
    });

    describe(`Alternate data for this test required`, () => {
        beforeEach(async () => {
            await Film.deleteMany()
                .then(() => console.log(`Database cleared`))
                .catch(error => {
                    console.log(`Error clearing`);
                    throw new Error();
                });

            await Film.insertMany(testData.films2)
                .then(() => console.log(`Database populated with sampleTrainerData`))
                .catch(error => {
                    console.log(`Error inserting`);
                    throw new Error();
                });
        });

        it(`should return a 404 when no films with a valid status are found`, async () => {

            const res = await chai.request(server)
                .get(`${TESTBASEPATH}/2`)
                .send();

            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property(`message`, `No films found`);
        });
    });

    describe(`Test singleFilms methods`, () => {
        const TESTBASEPATH = `/singleFilm`;
        it(`should retrieve the film with the given id when /singleFilm/:id is hit`, async () => {
            const res = await chai.request(server)
                .get(`${TESTBASEPATH}/${testData.films[1][`_id`]}`)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property(`_id`, testData.films[1][`_id`]);
        });

        it(`should return a 422 when the film id asked for is not in the correct format`, async () => {
            const res = await chai.request(server)
                .get(`${TESTBASEPATH}/notAValidId`)
                .send();

            expect(res).to.have.status(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property(`message`, `There was a problem with the film Id`);
        });

        it(`should return a 404 when the film id asked for is valid but not found`, async () => {
            const res = await chai.request(server)
                .get(`${TESTBASEPATH}/123456789012345678901234`)
                .send();

            expect(res).to.have.status(404);
            expect(res.body).to.have.property(`message`, `Not found`);
        });
    });
});