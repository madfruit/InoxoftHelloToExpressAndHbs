module.exports = {
    userNormalizer: (user) => {
        const fieldsToRemove = [
            'password',
            '__v'
        ];
        try {
            user = user.toObject();
        } catch (e) {
        }

        fieldsToRemove.forEach((field) => {
            delete user[field];
        });
        return user;
    }
};
