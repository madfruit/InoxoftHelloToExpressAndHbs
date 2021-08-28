const { Schema, model } = require('mongoose');

const carFuelTypesEnum = require('../configs/carFuel.enum');

const carSchema = new Schema({
    producer: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    fuel: {
        type: String,
        required: true,
        enum: Object.values(carFuelTypesEnum)
    }
}, { timestamps: true });

module.exports = model('car', carSchema);
