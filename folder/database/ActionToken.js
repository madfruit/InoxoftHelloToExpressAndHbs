const { Schema, model } = require('mongoose');
const { dbTables, actionTokens } = require('../configs');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbTables.USER
    },

    type: {
        type: String,
        required: true,
        enum: Object.values(actionTokens)
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

ActionTokenSchema.pre('findOne', function() {
    this.populate(dbTables.USER);
});

module.exports = model(dbTables.ACTION_TOKENS, ActionTokenSchema);
