const userService = require('../services/user.service');
const ErrorHandler = require('../errors/ErrorHandler');
const userValidators = require('../validators/user.validators');

module.exports = {
    checkEmailExists: async (req, res, next) => {
        try {
            const { email = '' } = req.body;

            const userByEmail = await userService.getUserByEmail(email);

            if (userByEmail) {
                throw new ErrorHandler(409, 'Email already exists in database');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    userExists: async (req, res, next) => {
        try {
            const { user_email } = req.params;

            const user = await userService.getUserByEmail(user_email);

            if (!user) {
                throw new ErrorHandler(404, 'User not found');
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
                throw new ErrorHandler(400, error.details[0].message);
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
                throw new ErrorHandler(400, error.details[0].message);
            }

            req.body = value;
            next();
        } catch (err) {
            next(err);
        }
    }
};
