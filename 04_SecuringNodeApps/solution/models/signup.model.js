import mongoose from 'mongoose';
import { isoDateRegExp, emailRegExp, phoneNumberRegExp } from '../js/regExps.js';
import { validTitles, validGenders } from '../js/validData.js';

const Schema = mongoose.Schema;

const signupSchema = new Schema({
    title: {
        type: String, required: [true, `No title supplied`], validate: {
            validator: value => validTitles.includes(value),
            message: `Not a valid title`
        }
    },
    firstName: {
        type: String, required: [true, `No first name supplied`], validate: {
            validator: value => {
                return value.length > 1;
            },
            message: `First name is not long enough`
        }
    },
    lastName: {
        type: String, required: [true, `No last name supplied`], validate: {
            validator: value => {
                return value.length > 1;
            },
            message: `Last Name is not long enough`
        }
    },
    email: { type: String, required: [true, `No email supplied`], match: [emailRegExp, `Invalid Email format`] },
    phoneNumber: { type: String, match: [phoneNumberRegExp, `Invalid phone number supplied`], required: false },
    dob: { type: Date, match: [isoDateRegExp, `Invalid date of birth supplied`], required: false },
    gender: {
        type: String, validate: {
            validator: value => {
                if (!value) {
                    return true;
                } else {
                    return validGenders.includes(value);
                }
            },
            message: `Not a valid gender`
        },
        required: false
    }
});

const Signup = mongoose.model(`Signup`, signupSchema);
export default Signup;
export { validTitles, validGenders };