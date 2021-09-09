const { actionTokens, emailActions, constants } = require('../configs');
const {
    jwtService,
    actionTokenService,
    userService,
    passwordService,
    emailService
} = require('../services');

module.exports = {
    grantAdmin: async (req, res, next) => {
        try {
            const user = req.body;
            const token = jwtService.generateAdminToken();

            user.password = await passwordService.hash(user.password);

            const userInDB = await userService.createUser(user);
            await actionTokenService.createToken(userInDB._id, token, actionTokens.GRANT_ADMIN);

            const url = `${constants.API_URL}/admin/password/token=${token}`;
            await emailService.sendMail(user.email, emailActions.GRANT_ADMIN, {
                userName: user.name,
                changePasswordUrl: url
            });
            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { currentUser } = req;

            currentUser.password = await passwordService.hash(password);

            await userService.updateUser(currentUser, currentUser.email);
            res.json('ok');
        } catch (e) {
            next(e);
        }
    }
};
