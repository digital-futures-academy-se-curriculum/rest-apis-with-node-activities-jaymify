import mongoose from 'mongoose';
import { isoDateRegExp } from '../js/regExps.js';

const Schema = mongoose.Schema;

const filmSchema = new Schema({
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    cast: { type: String, required: true },
    directors: { type: String, required: true },
    showingTimes: { type: String, required: true },
    releaseDate: { type: Date, required: true, match: [isoDateRegExp, `is invalid`] },
    filmStatus: { type: Number, min: 1, max: 2 },
    img: { type: String, required: true }
});

const Film = mongoose.model(`Film`, filmSchema);
export default Film;

