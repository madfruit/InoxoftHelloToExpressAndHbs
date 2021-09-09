const { ResetPassword } = require('../database');

module.exports = {

    createToken: async (user_id, token) => {
        await ResetPassword.create({ reset_token: token, user: user_id });
    },

    getUserByToken: async (token) => {
        const resetToken = await ResetPassword.findOne({ reset_token: token });
        return resetToken.toJSON().user;
    },

    deleteTokenByUserId: async (user_id) => {
        await ResetPassword.deleteOne({ user: user_id });
    },
};
