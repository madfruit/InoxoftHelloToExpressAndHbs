const userService = require('../services/user.service');
const ErrorHandler = require('../errors/ErrorHandler');

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
    }
};
