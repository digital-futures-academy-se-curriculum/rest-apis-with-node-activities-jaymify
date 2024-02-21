import express from 'express';

import Film from '../models/film.model.js';
import { mongoIdRegExp } from '../js/regExps.js';

export const router = express.Router();

router.route(`/:id`).get((req, res) => {
    const id = req.params.id;
    if (!id.match(mongoIdRegExp)) {
        return res.status(422).json({
            'message': `There was a problem with the film Id`,
        });
    }
    Film.findById(id, (error, film) => {
        (error || !film) ? res.status(404).json({ 'message': `Not found` }) : res.json(film);
    });
});
