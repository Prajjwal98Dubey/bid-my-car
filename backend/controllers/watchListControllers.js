const WatchList = require('../models/watchlist')
const User = require('../models/user')
const Cars = require('../models/car')
const addToWatchList = async (req, res) => {
    const { userEmail, carId } = req.body
    try {
        if (await User.findOne({ email: userEmail }) && await Cars.findOne({ _id: carId })) {
            const CarDetails = await Cars.findOne({ _id: carId })
            const watch = await WatchList.create({
                userEmail: userEmail,
                carId: carId,
                make: CarDetails.make,
                model: CarDetails.model,
                images: CarDetails.images[0],
                seller: CarDetails.seller,
                description: CarDetails.description,
                transmission: CarDetails.transmission
            })
            watch.save()
            res.json(watch)
        }
    }
    catch (error) {
        res.json(error)
    }
}
const removeFromWatchList = async (req, res) => {
    const userEmail = req.query.email
    const carId = req.query.carId
    try {
        if (await User.findOne({ email: userEmail }) && await Cars.findOne({ _id: carId })) {
            const tmp1 = await User.findOne({ email: userEmail })
            const tmp2 = await Cars.findOne({ _id: carId })
            const watchId = await WatchList.find({ userEmail: userEmail, carId: carId })
            await WatchList.findByIdAndDelete({ _id: watchId[0]._id })
            res.json({ "deleted": watchId })
        }
    }
    catch (error) {
        console.log(error)
    }
}
const checkCarInWatchList = async (req, res) => {
    const { userEmail, carId } = req.body
    try {
        if (await User.findOne({ email: userEmail }) && await Cars.findOne({ _id: carId })) {
            const watchId = await WatchList.find({ userEmail: userEmail, carId: carId })
            if (watchId.length > 0) {
                res.json({ status: true })
            }
            else {
                res.json({ status: false })
            }

        }
    }
    catch (error) {
        console.log(error)
    }
}
const getAllWatchListCarOfUser = async (req, res) => {
    const userEmail = req.query.email
    try {
        const userCars = await WatchList.find({ userEmail: userEmail })
        res.json(userCars)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { addToWatchList, removeFromWatchList, checkCarInWatchList, getAllWatchListCarOfUser }