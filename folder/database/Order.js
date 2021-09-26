const { Schema, model } = require('mongoose');

const { dbTables } = require('../configs');

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbTables.USER
    },

    book_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbTables.BOOK
    },

    amount: {
        type: 'Number',
        required: true,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

orderSchema.pre('findOne', function() {
    this.populate(dbTables.BOOK);
});

module.exports = model('order', orderSchema);
