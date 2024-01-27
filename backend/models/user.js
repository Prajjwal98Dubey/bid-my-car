const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfeu5IN1of5Cqbig2sU8MIqIKR3BZr1Mgi39zgL66eeg&s"
    }
})

module.exports = mongoose.model('User', userSchema)