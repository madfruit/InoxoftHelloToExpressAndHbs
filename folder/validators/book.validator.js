const Joi = require('joi');

const bookValidator = Joi.object({
    name: Joi.string().required().trim(),

    author: Joi.string().alphanum().required().trim(),

    publisher: Joi.string().required().trim(),

    genre: Joi.string().required().trim(),

    ageRestriction: Joi.string().trim(),

    price: Joi.number().required().min(1),

    amount: Joi.number().required().min(0)
});

module.exports = bookValidator;
