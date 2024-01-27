const express = require('express')
const { createUser } = require('../controllers/userControllers')

const userRouter = express.Router()

userRouter.post('/my',createUser)

module.exports = userRouter