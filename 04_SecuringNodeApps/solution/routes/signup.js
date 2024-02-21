import express from 'express';
import { check, validationResult } from 'express-validator';

import Signup from '../models/signup.model.js';
import { isoDateRegExp, phoneNumberRegExp } from '../js/regExps.js';
import { validTitles, validGenders } from '../js/validData.js';

export const router = express.Router();

router.route(`/`).post(
    [
        check('title').exists().isIn(validTitles),
        check('firstName').exists().isLength({ min: 2 }),
        check('lastName').exists().isLength({ min: 2 }),
        check('email').exists().isEmail(),
        check('phoneNumber').optional({ checkFalsy: true }).matches(phoneNumberRegExp),
        check('dob').optional({ checkFalsy: true }).matches(isoDateRegExp),
        check('gender').optional({ checkFalsy: true }).isIn(validGenders)
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                'message': `There were errors in the sign up data`,
                'error': errors.array()
            });
        }
        const signup = new Signup(req.body);
        signup.save()
            .then(signup => {
                res.status(200).json({ 'message': `Sign up successful` });
            })
            .catch(err => {
                res.status(400).json({
                    'message': `Sign up unsuccessful`,
                    'error': err
                });
            });
    }
);
