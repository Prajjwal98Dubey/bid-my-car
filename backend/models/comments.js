const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    bid: {
        type: String
    },
    carId: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    reply: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    userName: {
        type: String
    },
    userPhoto: {
        type: String
    },
    time:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Comments', commentSchema)