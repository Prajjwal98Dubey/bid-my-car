const express = require('express')
const app  = express()
const cors = require('cors')
const connectDB = require('./config/db')
const carRouter = require('./routes/carRoutes')
const userRouter = require('./routes/userRoutes')
const watchListRouter = require('./routes/watchlistRoutes')
const commentRouter = require('./routes/commentRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/cars',carRouter)
app.use('/api/user',userRouter)
app.use('/api/watch',watchListRouter)
app.use('/api/comment',commentRouter)


const start = async()=>{
    await connectDB()
    app.listen(5001,()=>console.log("Server Connected at 5001🚀🚀"))
}
start()