import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const openingTimeSchema = new Schema({
    day: { type: String, required: true },
    opening: { type: String, required: true },
    close: { type: String, required: true },
});

const OpeningTime = mongoose.model(`OpeningTime`, openingTimeSchema);
export default OpeningTime;