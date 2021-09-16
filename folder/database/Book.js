const { Schema, model } = require('mongoose');
const { dbTables } = require('../configs');

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    author: {
        type: String,
        required: true,
        trim: true
    },

    publisher: {
        type: String,
        required: true,
        trim: true
    },

    genre: {
        type: String,
        required: true,
        trim: true
    },

    ageRestriction: {
        type: String,
        required: false,
        trim: true
    },

    price: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = model('book', bookSchema);
