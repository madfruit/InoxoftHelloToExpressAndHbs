const { Car } = require('../database');

module.exports = {
    createCar: async (carObject) => {
        const car = await Car.create(carObject);
        return car;
    },

    getAllCars: async () => {
        const cars = await Car.find({});
        return cars;
    },

    getCarById: async (carId) => {
        const car = await Car.findById(carId);
        return car;
    },

    findCar: async (car_producer, car_model, car_fuel) => {
        const carInDB = await Car.findOne({ producer: car_producer, model: car_model, fuel: car_fuel });
        return carInDB;
    },

    updateCar: async (car, carId) => {
        const updatedCar = await Car.findByIdAndUpdate(carId, car);
        return updatedCar;
    },

    deleteCar: async (carId) => {
        await Car.findByIdAndDelete(carId);
    }
};
