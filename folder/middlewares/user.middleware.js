const userService = require('../services/user.service');
const ErrorHandler = require('../errors/ErrorHandler');
const { userValidators, idValidator } = require('../validators');
const statusCodes = require('../configs/statusCodes.enum');
const { userRoles } = require('../configs');

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
        } catch (e) {
            next(e);
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
        } catch (e) {
            next(e);
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
        } catch (e) {
            next(e);
        }
    },

    checkUserPassword: (req, res, next) => {
        try {
            const { error, value } = userValidators.passwordUserValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.currentUser;

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
    },

    canDeleteUser: (req, res, next) => {
        try {
            const { currentUser } = req;
            const { user_email } = req.params;

            if (!currentUser) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Log in to perform this action');
            }

            if (currentUser.role !== userRoles.ADMIN && currentUser.email !== user_email) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, 'You are not admin');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    canUpdateUser: (req, res, next) => {
        try {
            const { currentUser } = req;
            const { user_email } = req.params;

            if (!currentUser) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Log in to perform this action');
            }

            if (currentUser.email !== user_email) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, 'You can only edit your profile');
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
