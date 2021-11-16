const joi = require('@hapi/joi');

const genders = ['male', 'female', 'other'];

const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
    gender: joi.string().valid(...genders).required(),
    birthDate: joi.date()
});

module.exports = schema;