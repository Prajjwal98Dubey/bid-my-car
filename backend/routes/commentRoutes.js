const express = require('express') 
const { addUserComment, getAllComments } = require('../controllers/commentControllers')
const commentRouter = express.Router()


commentRouter.post('/add-comment',addUserComment)
commentRouter.get('/get-comment',getAllComments)


module.exports = commentRouter