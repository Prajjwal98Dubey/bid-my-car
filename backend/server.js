const express = require('express')
const app  = express()
const cors = require('cors')
const connectDB = require('./config/db')
const carRouter = require('./routes/carRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/cars',carRouter)


const start = async()=>{
    await connectDB()
    app.listen(5001,()=>console.log("Server Connected at 5001🚀🚀"))
}
start()