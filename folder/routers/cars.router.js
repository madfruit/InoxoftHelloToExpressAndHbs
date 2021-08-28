const router = require('express').Router();

const carController = require('../controllers/car.controller');
const { checkCarAlreadyExists, checkCarExists } = require('../middlewares/car.middleware');

router.get('/', carController.getAllCars);
router.get('/:car_id', carController.getCarById);
router.delete('/car_id', checkCarExists, carController.deleteCar);
router.put('/:car_id', checkCarExists, carController.updateCar);
router.post('/', checkCarAlreadyExists, carController.createCar);

module.exports = router;
