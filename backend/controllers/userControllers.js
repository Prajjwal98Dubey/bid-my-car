const User = require('../models/user')
const bcrypt = require('bcrypt')
const createUser = async (req, res) => {
    const { name, email, password, pic } = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const user = await User.create({
            name: name,
            email: email,
            password: password ? await bcrypt.hash(password, salt) : password,
            pic: pic ? pic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfeu5IN1of5Cqbig2sU8MIqIKR3BZr1Mgi39zgL66eeg&s"
        })
        user.save()
        console.log(user)
        res.json(user)
    }
    catch (error) {
        res.json(error)
    }
}

const getUser = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
        console.log(user)
        res.json(user)
        return
    }
    res.status(404).json("Email does not exists.")
}

module.exports = { createUser,getUser }