const { User } = require('../database');

module.exports = {

    createUser: async (userObject) => {
        const user = await User.create(userObject);
        return user;
    },

    getUserByEmail: async (userEmail) => {
        const user = await User.findOne({ email: userEmail });
        return user;
    },

    getAllUsers: async () => {
        const users = await User.find({});
        return users;
    },

    updateUser: async (user) => {
        const updatedUser = await User.findOneAndUpdate({ email: user.email }, user);
        return updatedUser;
    },

    deleteUser: async (userEmail) => {
        await User.findOneAndDelete({ email: userEmail });
    }
};
