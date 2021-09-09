const {
    constants,
    statusCodes,
    emailActions,
    actionTokens
} = require('../configs');
const { OAuth } = require('../database');
const {
    passwordService,
    jwtService,
    emailService,
    actionTokenService,
    userService,
    oauthService
} = require('../services');
const { userUtil } = require('../utils');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(password, user.password);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userUtil.userNormalizer(user)
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            await OAuth.deleteOne({ access_token: token });

            res.status(statusCodes.NO_CONTENT).json('Ok');
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const { currentUser } = req;

            await OAuth.deleteOne({ refresh_token: token });

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: currentUser._id });

            res.json({
                ...tokenPair,
                user: userUtil.userNormalizer(currentUser)
            });
        } catch (e) {
            next(e);
        }
    },

    startPasswordReset: async (req, res, next) => {
        try {
            const { user } = req;

            const token = jwtService.generateResetToken();

            const url = `${constants.API_URL}/auth/reset?token=${token}`;

            await emailService.sendMail(
                user.email,
                emailActions.PASSWORD_RESET,
                {
                    userName: user.name,
                    resetUrl: url
                }
            );
            await actionTokenService.createToken(user._id, token, actionTokens.RESET_PASSWORD);
            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const { reset_token } = req.query;

            jwtService.verifyResetToken(reset_token);
            const user = await actionTokenService.getUserByToken(reset_token, actionTokens.RESET_PASSWORD);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updatePassword: async (req, res, next) => {
        try {
            const { currentUser } = req;
            const { password } = req.body;
            currentUser.password = await passwordService.hash(password);
            await userService.updateUser(currentUser, currentUser.email);
            await oauthService.deleteAllTokenPairsByUserId(currentUser._id);
            await actionTokenService.deleteTokenByUserId(currentUser._id, actionTokens.RESET_PASSWORD);
            res.json('ok');
        } catch (e) {
            next(e);
        }
    }
};
