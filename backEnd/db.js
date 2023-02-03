const mongoose = require('mongoose')
const mongoURI =  "mongodb://localhost:27017"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongoose Successfully")
    })
}

// to use in differ file we have to export this

module.exports =  connectToMongo;