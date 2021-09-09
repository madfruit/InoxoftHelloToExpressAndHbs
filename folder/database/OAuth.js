const { Schema, model } = require('mongoose');

const { dbTables } = require('../configs');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbTables.USER
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

OAuthSchema.pre('findOne', function() {
    this.populate(dbTables.USER);
});

module.exports = model(dbTables.OAUTH, OAuthSchema);
