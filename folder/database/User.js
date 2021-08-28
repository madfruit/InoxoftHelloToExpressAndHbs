const { Schema, model } = require('mongoose');

const userRolesEnum = require('../configs/userRoles.enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    },
    password: {
        type: String,
        unique: true,
        trim: true,
        required: true
    }
}, { timestamps: true });

module.exports = model('user', userSchema);
