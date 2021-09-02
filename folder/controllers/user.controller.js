const { userService, passwordService } = require('../services');
const userNormalizer = require('../utils/user.util');

const statusCodes = require('../configs/statusCodes.enum');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const userToAdd = req.body;
            userToAdd.password = await passwordService.hash(password);
            const user = await userService.createUser(userToAdd);
            const normalizedUser = userNormalizer(user);
            res.status(statusCodes.CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getUserByEmail: async (req, res, next) => {
        try {
            const { user_email } = req.params;
            const user = await userService.getUserByEmail(user_email);
            const normalizedUser = userNormalizer(user);
            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            const normalizedUsers = [];
            users.forEach((user) => {
                normalizedUsers.push(userNormalizer(user));
            });
            res.json(normalizedUsers);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const userToUpdate = req.body;
            const {user_email} = req.params;
            const user = await userService.updateUser(userToUpdate, user_email);
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
