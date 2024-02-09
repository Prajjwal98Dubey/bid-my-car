
const User = require('../models/user')
const Comment = require('../models/comments')

const addUserComment = async (req, res) => {
    const { bid, carId, desc, user, reply } = req.body
    const currUser = await User.findOne({ email: user })
    try {
        const comment = await Comment.create({
            bid: bid,
            carId: carId,
            desc: desc,
            reply: reply,
            user: user,
            userName: currUser.name,
            userPhoto: currUser.pic
        })
        comment.save()
        res.json({
            bid: bid,
            carId: carId,
            desc: desc,
            reply: reply,
            user: user,
            userName: currUser.Name,
            userPhoto: currUser.pic
        })
    } catch (error) {
        res.json(error)
    }
}

const getAllComments = async (req, res) => {
    const { carId } = req.query
    try {
        const comments = await Comment.find({ carId: carId })
        res.json(comments)
    }
    catch (error) {
        res.json(error)
    }
}


module.exports = { addUserComment, getAllComments }