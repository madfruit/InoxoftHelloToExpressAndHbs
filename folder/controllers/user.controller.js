const userService = require('../services/user.service');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const userToAdd = req.body;
            const user = await userService.createUser(userToAdd);
            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    getUserByEmail: async (req, res, next) => {
        try {
            const { user_email } = req.params;
            const user = await userService.getUserByEmail(user_email);
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const userToUpdate = req.body;
            const user = await userService.updateUser(userToUpdate);
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserByEmail: async (req, res, next) => {
        try {
            const { user_email } = req.params;
            await userService.deleteUser(user_email);
            res.json(user_email);
        } catch (e) {
            next(e);
        }
    }
};
