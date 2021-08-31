/* eslint-disable no-param-reassign */
const userNormalizer = (user) => {
    const fieldsToRemove = [
        'password',
        '__v'
    ];
    user = user.toObject();

    fieldsToRemove.forEach((field) => {
        delete user[field];
    });
    return user;
};

module.exports = userNormalizer;
