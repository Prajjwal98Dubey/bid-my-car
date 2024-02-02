const mongoose = require('mongoose')
const watchListSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    carId: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('WatchList', watchListSchema)