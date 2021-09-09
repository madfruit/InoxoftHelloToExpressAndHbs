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

    updateUser: async (user, userEmail) => {
        const updatedUser = await User.findOneAndUpdate({ email: userEmail }, user);
        return updatedUser;
    },

    deleteUser: async (userEmail) => {
        await User.findOneAndDelete({ email: userEmail });
    },

    getUserByDynamicParam: async (dbField, value) => {
        const user = await User.findOne({ [dbField]: value });
        return user;
    },

    resetPassword: async (user, password) => {
        const updatedUser = { ...user, password };
        await User.findOneAndUpdate({ email: user.email }, updatedUser);
    }
};
