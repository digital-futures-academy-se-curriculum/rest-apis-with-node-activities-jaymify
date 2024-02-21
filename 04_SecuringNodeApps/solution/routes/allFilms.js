import express from 'express';
import Film from '../models/film.model.js';

export const router = express.Router();

router.route(`/`).get((req, res) => {
    Film.find((error, films) => {
        error ? res.status(404).json({ 'message': `Not found` }) : res.json(films);
    });

});

router.route(`/:filmStatus`).get(
    (req, res) => {
        const filmStatus = req.params.filmStatus;
        if (isNaN(parseInt(filmStatus)) || (filmStatus < 1 || filmStatus > 2)) {
            return res.status(422).json({
                'message': `Not a valid film status`
            });
        }
        Film.find({ filmStatus }, (error, films) => {
            if (error) {
                return res.status(404).json({ 'message': `Status not found` });
            }
            if (!films.length) {
                return res.status(404).json({ 'message': `No films found` });
            }
            return res.json(films);
        });
    }
);