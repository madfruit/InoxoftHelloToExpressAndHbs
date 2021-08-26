const fs = require('fs');
const util = require('util');
const path = require('path');
const users = require('../database/users.json');

const dbPath = path.join(__dirname, '../database/users.json');

const writeFilePromisified = util.promisify(fs.writeFile);

function getUsers() {
    return users;
}

module.exports = {
    addUser: async (user) => {
        users.push(user);
        await writeFilePromisified(dbPath, JSON.stringify(users));
    },
    getUserByEmail: (email) => {
        const user = users.find((u) => u.email === email);
        return user;
    },
    getUsers
};
