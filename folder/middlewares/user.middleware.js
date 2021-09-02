const userService = require('../services/user.service');
const ErrorHandler = require('../errors/ErrorHandler');
const { userValidators, idValidator } = require('../validators');
const statusCodes = require('../configs/statusCodes.enum');

module.exports = {
    checkEmailExists: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(statusCodes.CONFLICT, 'Email already exists in database');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    userExists: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, 'User not found');
            }
            next();
        } catch (err) {
            next(err);
        }
    },

    checkNewUserData: (req, res, next) => {
        try {
            const { error, value } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;
            next();
        } catch (err) {
            next(err);
        }
    },

    checkUserDataForUpdate: (req, res, next) => {
        try {
            const { error, value } = userValidators.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;
            next();
        } catch (err) {
            next(err);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!roleArr.length) {
                return next();
            }

            if (!roleArr.includes(role)) {
                throw new ErrorHandler();
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await userService.getUserByDynamicParam(dbField, value);

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIdIsValid: (req, res, next) => {
        try {
            const { id } = req.params;

            idValidator.validateMongoId(id);
            next();
        } catch (e) {
            next(e);
        }
    }
};
