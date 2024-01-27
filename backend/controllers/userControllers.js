const User = require('../models/user')
const bcrypt = require('bcrypt')
const createUser = async (req, res) => {
    const { name, email, password, pic } = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name: name,
            email: email,
            password: newPassword,
            pic: pic
        })
        user.save()
        console.log(user)
        res.json(user)
    }
    catch (error) {
        res.json(error)
    }
}


module.exports = { createUser }