const { constants, statusCodes, actionTokens } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');
const { jwtService, oauthService, actionTokenService } = require('../services');

module.exports = {
    checkToken: (tokenType = 'access') => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'No token');
            }

            await jwtService.verifyToken(token, tokenType);

            const tokenFromDB = await oauthService.getTokenPair(token, tokenType);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Invalid token');
            }

            req.currentUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (tokenType) => async (req, res, next) => {
        try {
            const { token } = req.query;
            if (!token) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, 'No token');
            }

            if (tokenType === actionTokens.RESET_PASSWORD) {
                await jwtService.verifyResetToken(token);
            } else {
                await jwtService.verifyAdminToken(token);
            }

            const user = await actionTokenService.getUserByToken(token, tokenType);
            if (!user) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, 'Invalid token');
            }
            req.currentUser = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
