const { dbTables } = require('../configs');
const { OAuth } = require('../database');

module.exports = {
    createTokenPair: async (tokenPair, user_id) => {
        await OAuth.create({ ...tokenPair, user: user_id });
    },

    updateTokenPair: async (oldTokenPair, newTokenPair) => {
        await OAuth.findOneAndUpdate({ access_token: oldTokenPair.access_token }, { ...newTokenPair }, {});
    },

    deleteTokenPair: async (tokenPair) => {
        await OAuth.findOneAndDelete({ access_token: tokenPair.access_token });
    },

    getTokenPair: async (token, tokenType) => {
        const tokenPair = await OAuth.findOne({ [`${tokenType}_token`]: token }).populate(dbTables.USER);
        return tokenPair;
    },

    deleteAllTokenPairsByUserId: async (user_id) => {
        await OAuth.deleteMany({ user: user_id });
    }
};
