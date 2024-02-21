import mongoose from 'mongoose';
import { isoDateRegExp, emailRegExp } from '../js/regExps.js';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookingSchema = new Schema({
    filmId: { type: ObjectId, required: true },
    bookingDate: { type: Date, required: true, match: [isoDateRegExp, `is invalid`] },
    email: {
        type: String, required: true, match: [emailRegExp, `is invalid`]
    },
    adults: { type: Number, min: 0 },
    child: { type: Number, min: 0 },
    concessions: { type: Number, min: 0 }
});

const Booking = mongoose.model(`Booking`, bookingSchema);
export default Booking;