import Chance from 'chance';

import { validTitles, validGenders } from '../../js/validData.js';

const chance = new Chance();

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * (this.length - 1))];
};

const noTitle = {
    title: ``
};

const noFirstName = {
    title: `Mr`,
    firstName: ``,
    lastName: `Testname`,
    email: `test@email.com`
};

const noLastName = {
    title: `Mr`,
    firstName: `Testname`,
    lastName: ``,
    email: `test@email.com`
};

const noEmail = {
    title: `Mr`,
    firstName: `Testname`,
    lastName: `Testname`,
    email: ``
};

const onlyRequired = {
    title: `Mr`,
    firstName: `Testname`,
    lastName: `Testname`,
    email: `test@email.com`
};

const onlyRequiredNoData = {
    title: ``,
    firstName: ``,
    lastName: ``,
    email: ``
};

const onlyRequiredInvalid = {
    title: `NotATitle`,
    firstName: `T`,
    lastName: `T`,
    email: `invalid email`
};

const invalidTitle = {
    title: `NotATitle`,
    firstName: `Testname`,
    lastName: `Testname`,
    email: `test@email.com`
};

const invalidFirstName = {
    title: `Ms`,
    firstName: `E`,
    lastName: `Testname`,
    email: `test@email.com`
};

const invalidLastName = {
    title: `Ms`,
    firstName: `Testname`,
    lastName: `T`,
    email: `test@email.com`
};

const invalidEmail = {
    title: `Ms`,
    firstName: `Testname`,
    lastName: `T`,
    email: `invalidEmail`
};

const invalidPhoneNumber = {
    title: `Mr`,
    firstName: `Testname`,
    lastName: `Testname`,
    email: `test@email.com`,
    phoneNumber: `invalidNumber`
};

const invalidDob = {
    title: `Mr`,
    firstName: `Testname`,
    lastName: `Testname`,
    email: `test@email.com`,
    dob: `dob`
};

const invalidGender = {
    title: `Mr`,
    firstName: `Testname`,
    lastName: `Testname`,
    email: `test@email.com`,
    gender: `gender`
};

export const randomValidTitle = () => {
    const title = validTitles.randomElement();
    const signup = {
        title,
        firstName: `Testname`,
        lastName: `Testname`,
        email: `test@email.com`
    };
    return signup;
};

export const randomValidFirstName = () => {
    const firstName = chance.first();
    const signup = {
        title: `Ms`,
        firstName,
        lastName: `Testname`,
        email: `test@email.com`
    };
    return signup;
};

export const randomValidLastName = () => {
    const lastName = chance.last();
    const signup = {
        title: `Ms`,
        firstName: `Testname`,
        lastName,
        email: `test@email.com`
    };
    return signup;
};

export const randomValidEmail = () => {
    const email = chance.email();
    const signup = {
        title: `Ms`,
        firstName: `Testname`,
        lastName: `Testname`,
        email
    };
    return signup;
};

export const randomValidPhoneNumber = () => {
    const phoneNumber = chance.phone({ country: 'uk' });
    const signup = {
        title: `Ms`,
        firstName: `Testname`,
        lastName: `Testname`,
        email: `test@email.com`,
        phoneNumber
    };
    return signup;
};

export const randomValidDob = () => {
    const dob = new Date(chance.birthday()).toISOString();
    const signup = {
        title: `Ms`,
        firstName: `Testname`,
        lastName: `Testname`,
        email: `test@email.com`,
        dob
    };
    return signup;
};

export const randomValidGender = () => {
    const gender = validGenders.randomElement();
    const signup = {
        title: `Dr`,
        firstName: `Testname`,
        lastName: `Testname`,
        email: `test@email.com`,
        gender
    };
    return signup;
};

export const randomValidSignup = () => {
    const signup = {
        title: validTitles.randomElement(),
        firstName: chance.first(),
        lastName: chance.last(),
        email: chance.email(),
        phoneNumber: chance.phone({ country: `uk` }),
        dob: new Date(chance.birthday()).toISOString(),
        gender: validGenders.randomElement()
    };
    return signup;
};

const testData = {
    noTitle,
    noFirstName,
    noLastName,
    noEmail,
    onlyRequired,
    onlyRequiredNoData,
    onlyRequiredInvalid,
    invalidTitle,
    invalidFirstName,
    invalidLastName,
    invalidEmail,
    invalidPhoneNumber,
    invalidDob,
    invalidGender,
}

export default testData;