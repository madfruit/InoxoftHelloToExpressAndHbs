const Joi = require('joi');

const { constants, userRoles } = require('../configs');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(50)
        .trim()
        .required(),

    password: Joi.string().regex(constants.PASSWORD_REGEXP).trim().required(),

    birthDate: Joi.date().min(constants.MIN_DATE).max(constants.MAX_DATE).required(),

    email: Joi.string().regex(constants.EMAIL_REGEXP).trim().required(),

    role: Joi.string().allow(...Object.values(userRoles))
});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(50)
        .trim(),
    email: Joi.string().regex(constants.EMAIL_REGEXP).trim(),
});

const passwordUserValidator = Joi.object({
    password: Joi.string().regex(constants.PASSWORD_REGEXP).trim().required()
});

module.exports = {
    createUserValidator,
    updateUserValidator,
    passwordUserValidator
};
