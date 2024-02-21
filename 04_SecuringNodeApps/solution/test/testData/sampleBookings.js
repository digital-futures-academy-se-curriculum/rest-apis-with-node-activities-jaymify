const noFilmId = {
    "bookingDate": "2019-05-27T20:15:00.000Z",
    "email": "eg@example.com",
    "adults": "0",
    "child": "0",
    "concessions": "0"
};

const incorrectFilmIdFormat = {
    "filmId": "Not a MongoID format",
    "bookingDate": "2019-05-27T20:15:00.000Z",
    "email": "eg@example.com",
    "adults": "0",
    "child": "0",
    "concessions": 0
};

const noBookingDate = {
    "filmId": "507f1f77bcf86cd799439011",
    "email": "eg@example.com",
    "adults": "0",
    "child": "0",
    "concessions": 0
};

const incorrectBookingDateFormat = {
    "filmId": "507f1f77bcf86cd799439011",
    "bookingDate": "Invalid date format",
    "email": "eg@example.com",
    "adults": "0",
    "child": "0",
    "concessions": "0"
};

const noEmail = {
    "filmId": "507f1f77bcf86cd799439011",
    "bookingDate": "2019-05-27T20:15:00.000Z",
    "adults": "0",
    "child": "0",
    "concessions": "0"
};

const incorrectEmailFormat = {
    "filmId": "507f1f77bcf86cd799439011",
    "bookingDate": "2019-05-27T20:15:00.000Z",
    "email": "Invalid email format",
    "adults": "0",
    "child": "0",
    "concessions": "0"
};

const negativeAdultTickets = {
    "filmId": "507f1f77bcf86cd799439011",
    "bookingDate": "2019-05-27T20:15:00.000Z",
    "email": "eg@example.com",
    "adults": "-1",
    "child": "0",
    "concessions": "0"
};

const nonIntegerAdultTickets = {
    "filmId": "507f1f77bcf86cd799439011",
    "bookingDate": "2019-05-27T20:15:00.000Z",
    "email": "eg@example.com",
    "adults": "1.5",
    "child": "0",
    "concessions": "0"
};

const negativeChildTickets = {
    "filmId": "507f1f77bcf86cd799439011",
    "bookingDate": "2019-05-27T20:15:00.000Z",
    "email": "eg@example.com",
    "adults": "0",
    "child": "-1",
    "concessions": "0"
};

const nonIntegerChildTickets = {
    "filmId": "507f1f77bcf86cd799439011",
    "bookingDate": "2019-05-27T20:15:00.000Z",
    "email": "eg@example.com",
    "adults": "0",
    "child": "1.5",
    "concessions": "0"
};

const negativeConcessionsTickets = {
    "filmId": "507f1f77bcf86cd799439011",
    "bookingDate": "2019-05-27T20:15:00.000Z",
    "email": "eg@example.com",
    "adults": "0",
    "child": "0",
    "concessions": "-1"
};

const nonIntegerConcessionsTickets = {
    "filmId": "507f1f77bcf86cd799439011",
    "bookingDate": "2019-05-27T20:15:00.000Z",
    "email": "eg@example.com",
    "adults": "0",
    "child": "0",
    "concessions": "1.5"
};

const validBooking = {
    "filmId": "507f1f77bcf86cd799439011",
    "bookingDate": "2019-05-27T20:15:00.000Z",
    "email": "eg@example.com",
    "adults": "1",
    "child": "1",
    "concessions": "1"
};

const testData = {
    noFilmId,
    incorrectFilmIdFormat,
    noBookingDate,
    incorrectBookingDateFormat,
    noEmail,
    incorrectEmailFormat,
    negativeAdultTickets,
    nonIntegerAdultTickets,
    negativeChildTickets,
    nonIntegerChildTickets,
    negativeConcessionsTickets,
    nonIntegerConcessionsTickets,
    validBooking
};

export default testData;