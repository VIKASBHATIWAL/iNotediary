const mongoose = require("mongoose")
const mongoURI = "mongodb://127.0.0.1:27017/notebook"
const connectDB = async ()=>{
    mongoose.set('strictQuery', false)

    mongoose.connect(mongoURI, ()=>{

        console.log("Connected to mongodb successfully");
    })
}

module.exports = connectDB