const { ActionToken } = require('../database');

module.exports = {

    createToken: async (user_id, action_token, token_type) => {
        await ActionToken.create({ token: action_token, user: user_id, type: token_type });
    },

    getUserByToken: async (user_token, token_type) => {
        const resetToken = await ActionToken.findOne({ token: user_token, type: token_type });
        return resetToken.toJSON().user;
    },

    deleteTokenByUserId: async (user_id, token_type) => {
        await ActionToken.deleteOne({ user: user_id, type: token_type });
    },
};
