const express = require('express')
const { addMyCar, getCars } = require('../controllers/carControllers')
const carRouter = express.Router()

carRouter.post('/add-car',addMyCar)
carRouter.get('/get-cars',getCars)
module.exports = carRouter