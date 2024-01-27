const express = require('express')
const { addMyCar, getCars, getSingleCar } = require('../controllers/carControllers')
const carRouter = express.Router()

carRouter.post('/add-car',addMyCar)
carRouter.get('/get-cars',getCars)
carRouter.get('/singlecar/:carId',getSingleCar)
module.exports = carRouter