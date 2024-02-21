import express from 'express';
import { check, validationResult } from 'express-validator';
import Booking from '../models/booking.model.js';
import { isoDateRegExp } from '../js/regExps.js';

export const router = express.Router();

router.route(`/`).post(
    [
        check('filmId').exists().isMongoId(),
        check('bookingDate').exists().matches(isoDateRegExp),
        check('email').exists().isEmail().normalizeEmail(),
        check('adults').optional().isInt({ gt: -1 }),
        check('child').optional().isInt({ gt: -1 }),
        check('concessions').optional().isInt({ gt: -1 })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                'message': `There were errors in the booking data`,
                'error': errors.array()
            });
        }
        console.log(req.body);
        const booking = new Booking(req.body);
        booking.save()
            .then(booking => {
                res.status(200).json({ 'message': `Booking successful` });
            })
            .catch(err => {
                res.status(422).json({
                    'message': `Booking not made`,
                    'error': err
                });
            });
    }
);
