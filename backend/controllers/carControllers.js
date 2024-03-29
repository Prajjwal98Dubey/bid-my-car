
const Car = require('../models/car')
const addMyCar = async (req, res) => {
    const { make, model, numberplate , mileage, engine, transmission, exteriorColor, interiorColor, location, distance, seller, images, description, bidPrice, numberOfBids, basePrice, time } = req.body

    try {
        const car = await Car.create({
            make: make,
            model: model,
            numberplate:numberplate,
            mileage: mileage,
            engine: engine,
            transmission: transmission,
            exteriorColor: exteriorColor,
            interiorColor: interiorColor,
            location: location,
            distance: distance,
            seller: seller,
            images: images,
            description: description,
            bidPrice: bidPrice,
            numberOfBids: numberOfBids,
            basePrice: basePrice,
            time: time
        })
        car.save()
        res.status(200).json(car)
    }
    catch (err) {
        res.json(err)
    }
}

const getCars = async (req, res) => {
    const allCars = await Car.find({})
    res.status(200).json(allCars)
}

const getSingleCar = async (req, res) => {
    const { carId } = req.params
    try {
        const requiredCar = await Car.findOne({ _id: carId })
        console.log(requiredCar)
        res.json({ requiredCar })
    }
    catch (error) {
        console.log(error)
    }


}


module.exports = { addMyCar, getCars,getSingleCar }
