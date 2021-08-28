const { Car } = require('../database');
const carService = require('../services/car.service');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const carToAdd = req.body;
            const car = await Car.create(carToAdd);
            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await carService.getCarById(car_id);
            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.getAllCars();
            return cars;
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const carToUpdate = req.body;
            const car = await carService.updateCar(carToUpdate, car_id);
            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await carService.deleteCar(car_id);
            res.json(car_id);
        } catch (e) {
            next(e);
        }
    },
};
