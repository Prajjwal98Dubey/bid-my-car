const express = require('express')
const { createUser, getUser } = require('../controllers/userControllers')

const userRouter = express.Router()

userRouter.post('/my',createUser)
userRouter.post('/getuser',getUser)

module.exports = userRouter