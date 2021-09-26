const { User } = require('../database');

const queryService = require('./query.service');

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
        const updatedUser = await User.findOneAndUpdate({ email: userEmail }, user, { new: true });
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
    },

    setAvatar: async (user_id, location) => {
        const updatedUser = await User.findByIdAndUpdate(user_id.toString(), { avatar: location }, { new: true });
        return updatedUser;
    },

    findUsers: async (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;
        const skip = (page - 1) * perPage;
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };
        const filterObject = queryService.getFilterObject(filters);

        const users = await User
            .find(filterObject)
            .limit(+perPage)
            .skip(skip)
            .sort(sort);
        const count = await User.countDocuments(filterObject);
        return {
            data: users,
            page,
            limit: +perPage,
            pageCount: Math.ceil(count / perPage)
        };
    }
};
