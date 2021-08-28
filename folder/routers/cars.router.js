const router = require('express').Router();

const carController = require('../controllers/car.controller');
const { checkCarAlreadyExists, checkCarExists, checkCarById } = require('../middlewares/car.middleware');

router.get('/', carController.getAllCars);
router.get('/:car_id', carController.getCarById);
router.delete('/:car_id', checkCarById, carController.deleteCar);
router.put('/:car_id', checkCarById, carController.updateCar);
router.post('/', checkCarAlreadyExists, carController.createCar);

module.exports = router;
