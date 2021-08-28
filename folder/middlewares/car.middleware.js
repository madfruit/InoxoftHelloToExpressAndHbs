const { Car } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');

async function _findCar(car) {
    const carInDB = await Car.find({ producer: car.producer, model: car.model, fuel: car.fuel });
    return carInDB;
}

module.exports = {
    checkCarAlreadyExists: async (req, res, next) => {
        try {
            const { car } = req.body;

            const carInDB = await _findCar(car);

            if (carInDB) {
                throw new ErrorHandler(409, 'This car already exists in database');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkCarExists: async (req, res, next) => {
        try {
            const { car } = req.body;

            const carInDB = await _findCar(car);

            if (!carInDB) {
                throw new ErrorHandler(404, 'Car not found');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
