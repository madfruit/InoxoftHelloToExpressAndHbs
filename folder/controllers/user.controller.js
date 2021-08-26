const userService = require('../services/user.service');

module.exports = {
    getUserByEmail: (req, res) => {
        const { user_email } = req.params;
        const user = userService.getUserByEmail(user_email);
        if (!user) {
            res.send('User not found');
            return;
        }
        res.json(user);
    },

    getAllUsers: (req, res) => {
        const users = userService.getUsers();
        res.json(users);
    },

    createUser: async (req, res) => {
        const user = req.body;
        const userByEmail = userService.getUserByEmail(user.email);
        if (userByEmail) {
            res.end('Email is already in use');
            return;
        }
        await userService.addUser(user);
        res.redirect('/auth');
    }
};
