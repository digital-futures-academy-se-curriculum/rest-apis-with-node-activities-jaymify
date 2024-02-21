import express from 'express';
import OpeningTime from '../models/openingTime.model.js';

export const router = express.Router();

router.route(`/`).get((req, res) => {
    OpeningTime.find((error, openings) => {
        error ? res.status(404).json({ 'message': `Not found` }) : res.json(openings);
    });
});
