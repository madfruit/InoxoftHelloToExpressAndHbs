module.exports = {
    userNormalizer: (user) => {
        const fieldsToRemove = [
            'password',
            '__v'
        ];
        user = user.toObject();

        fieldsToRemove.forEach((field) => {
            delete user[field];
        });
        return user;
    }
};
