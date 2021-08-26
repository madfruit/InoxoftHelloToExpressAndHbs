const userService = require('../services/user.service');

module.exports = {
    getAuthPage: (req, res) => {
        res.render('login');
    },

    auth: (req, res) => {
        const { email, password } = req.body;
        const user = userService.getUserByEmail(email);

        if (!user) {
            res.redirect('/register');
            return;
        }
        if (password !== user.password) {
            res.status(403).end('Access denied, wrong password');
            return;
        }
        res.redirect(`users/${user.email}`);
    },

    getRegisterPage: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        const user = req.body;
        const existingUser = userService.getUserByEmail(user.email);
        if (existingUser) {
            res.end('Email is already in use');
            return;
        }
        await userService.addUser(user);
        res.redirect('/auth');
    }
};
