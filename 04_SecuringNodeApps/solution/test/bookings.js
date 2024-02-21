import Booking from '../models/booking.model.js';

import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import server from '../server.js';

import testData from './testData/sampleBookings.js';

const TESTPATH = `/makeBooking`;

chai.use(chaiHttp);

describe(`Test of booking system`, () => {
    beforeEach(async () => {
        await Booking.deleteMany()
            .then(() => console.log(`Database cleared`))
            .catch(error => {
                console.log(`Error clearing`);
                throw new Error();
            });
    });

    describe(`Test filmId POST errors`, () => {
        it(`should not create a booking without a filmId field`, async () => {
            let booking = testData.noFilmId;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.property('message', `There were errors in the booking data`);
        });

        it(`should not create a booking if the filmId field is not of type MongoId`, async () => {
            let booking = testData.incorrectFilmIdFormat;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message', `There were errors in the booking data`);
        });
    });

    describe(`Test bookingDate POST errors`, () => {
        it(`should not create a booking without a bookingDate field`, async () => {
            let booking = testData.noBookingDate;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking)

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message', `There were errors in the booking data`);
        });

        it(`should not create a booking if the bookingDate field does not pass the regular expression for ISO Date`, async () => {
            let booking = testData.incorrectBookingDateFormat;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message', `There were errors in the booking data`);
        });
    });

    describe(`Test email POST errors`, () => {
        it(`should not create a booking without an email field`, async () => {
            let booking = testData.noEmail;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message', `There were errors in the booking data`);
        });

        it(`should not create a booking if the filmId field is not of type MongoId`, async () => {
            let booking = testData.incorrectEmailFormat;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message', `There were errors in the booking data`);
        });
    });

    describe(`Test adult POST errors`, () => {
        it(`should not create a booking if the adult ticket field is less than 0`, async () => {
            let booking = testData.negativeAdultTickets;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message', `There were errors in the booking data`);
        });

        it(`should not create a booking if the adult ticket field is not an integer value`, async () => {
            let booking = testData.nonIntegerAdultTickets;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking)
            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message', `There were errors in the booking data`);
        });
    });

    describe(`Test child POST errors`, () => {
        it(`should not create a booking if the child ticket field is less than 0`, async () => {
            let booking = testData.negativeChildTickets;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message', `There were errors in the booking data`);
        });

        it(`should not create a booking if the child ticket field is not an integer value`, async () => {
            let booking = testData.nonIntegerChildTickets;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message', `There were errors in the booking data`);
        });
    });

    describe(`Test concessions POST errors`, () => {
        it(`should not create a booking if the concessions ticket field is less than 0`, async () => {
            let booking = testData.negativeConcessionsTickets;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message', `There were errors in the booking data`);
        });

        it(`should not create a booking if the concessions ticket field is not an integer value`, async () => {
            let booking = testData.nonIntegerConcessionsTickets;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message', `There were errors in the booking data`);
        });
    });

    describe(`Test properly formed booking success`, () => {
        it(`should create a booking if all of the required fields are present and all fields are valid`, async () => {
            const booking = testData.validBooking;
            const res = await chai.request(server)
                .post(TESTPATH)
                .send(booking);

            expect(res).to.have.status(200);
            expect(res.body).to.not.have.property('error');
            expect(res.body).to.have.property('message', `Booking successful`);

        });
    });
});
