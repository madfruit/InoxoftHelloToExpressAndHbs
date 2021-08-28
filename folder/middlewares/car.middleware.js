const ErrorHandler = require('../errors/ErrorHandler');
const carService = require('../services/car.service');

module.exports = {
    checkCarAlreadyExists: async (req, res, next) => {
        try {
            const { producer, model, fuel } = req.body;

            const carInDB = await carService.findCar(producer, model, fuel);

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
            const { producer, model, fuel } = req.body;

            const carInDB = await carService.findCar(producer, model, fuel);

            if (!carInDB) {
                throw new ErrorHandler(404, 'Car not found');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkCarById: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const carInDB = await carService.getCarById(car_id);
            if (!carInDB) {
                throw new ErrorHandler(404, 'Car not found');
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
