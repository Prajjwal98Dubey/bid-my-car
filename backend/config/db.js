const mongoose  = require('mongoose')
require('dotenv').config()
const connectDB = async()=>{
    const connection  = await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology:true
    })
    console.log(`MongoDB connected ${connection.connection.host}`)
}

module.exports = connectDB