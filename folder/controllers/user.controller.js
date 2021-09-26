const {
    userService,
    passwordService,
    emailService,
    s3Service,
    orderService,
    redisService
} = require('../services');
const { userNormalizer } = require('../utils/user.util');

const { statusCodes, emailActions } = require('../configs');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const userToAdd = req.body;
            userToAdd.password = await passwordService.hash(password);
            let user = await userService.createUser(userToAdd);
            const normalizedUser = userNormalizer(user);
            user = user.toObject();

            if (req.files && req.files.avatar) {
                const uploadFile = await s3Service.upload(req.files.avatar, 'user', '123');

                user = await userService.setAvatar(user._id, uploadFile.Location);
            }

            await emailService.sendMail(normalizedUser.email, emailActions.WELCOME, { userName: user.name });

            await redisService.setItem(`user/${user.email}`, user);

            res.status(statusCodes.CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getUserByEmail: async (req, res, next) => {
        try {
            const { user_email } = req.params;
            const user = await redisService.getOrSetItem(`user/${user_email}`, async () => {
                const userFromDb = await userService.getUserByEmail(user_email);

                if (!userFromDb) {
                    res.json('No such user');
                }

                return userFromDb;
            });

            const normalizedUser = userNormalizer(user);
            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers(req.query);
            const normalizedUsers = [];
            users.data.forEach((user) => {
                normalizedUsers.push(userNormalizer(user));
            });
            users.data = normalizedUsers;
            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const userToUpdate = req.body;
            const { user_email } = req.params;
            let user = await userService.updateUser(userToUpdate, user_email);

            user = user.toObject();
            redisService.setItem(`user/${user.email}`, user);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserByEmail: async (req, res, next) => {
        try {
            const { user_email } = req.params;
            redisService.deleteItem(`user/${user_email}`);
            await userService.deleteUser(user_email);
            res.json(user_email);
        } catch (e) {
            next(e);
        }
    },

    getOrderHistory: async (req, res, next) => {
        try {
            const { currentUser } = req;
            const orders = await orderService.getUserOrderHistory(currentUser._id);
            res.json(orders);
        } catch (e) {
            next(e);
        }
    }
};
