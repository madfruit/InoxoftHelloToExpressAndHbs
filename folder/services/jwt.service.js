const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errors/ErrorHandler');
const { configs, statusCodes } = require('../configs');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, configs.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, configs.REFRESH_TOKEN_SECRET, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? configs.ACCESS_TOKEN_SECRET : configs.REFRESH_TOKEN_SECRET;

            jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Invalid token');
        }
    },

    generateResetToken: () => {
        const token = jwt.sign({}, configs.RESET_TOKEN_SECRET, { expiresIn: '30m' });
        return token;
    },

    verifyResetToken: (token) => {
        try {
            jwt.verify(token, configs.RESET_TOKEN_SECRET);
        } catch (e) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, 'Invalid token');
        }
    }
};
