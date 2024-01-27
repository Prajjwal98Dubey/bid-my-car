const mongoose = require('mongoose')
const carModel = mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    numberplate:{
        type:String,
        required:true
    },
    mileage: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    exteriorColor: {
        type: String,
        required: true
    },
    interiorColor: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required:true
        }
    ],
    description: {
        type: String,
        required: true
    },
    qnA: {
        type: Object
    },
    bidPrice: {
        type: Number,
        required: true
    },
    numberOfBids: {
        type: Number,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('CarModel', carModel)


// mainImage: {
//     type: String,
//     required: true
// },
// sideImage1: {
//     type: String,
//     required: true
// },
// sideImage2: {
//     type: String,
//     required: true
// },
// sideImage3: {
//     type: String,
//     required: true
// },