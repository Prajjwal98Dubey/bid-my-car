const express = require('express')
const { addToWatchList, removeFromWatchList, checkCarInWatchList, getAllWatchListCarOfUser } = require('../controllers/watchListControllers')

const watchListRouter = express.Router()

watchListRouter.post('/add-to-watch-list',addToWatchList)
watchListRouter.delete('/remove-from-watch-list',removeFromWatchList)
watchListRouter.post('/check-car-watch-list',checkCarInWatchList)
watchListRouter.get('/get-my-watch-list-cars',getAllWatchListCarOfUser)
module.exports  = watchListRouter