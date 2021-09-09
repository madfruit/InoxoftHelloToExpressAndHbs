const { dbTables } = require('../configs');
const { Schema, model } = require('mongoose');

const ResetPasswordSchema = new Schema({
    reset_token: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbTables.USER
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

ResetPasswordSchema.pre('findOne', function() {
    this.populate(dbTables.USER);
});

module.exports = model(dbTables.RESET_PASSWORD, ResetPasswordSchema);
