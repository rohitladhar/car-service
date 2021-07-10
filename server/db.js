const mongoose = require('mongoose')

const MONGO_URL = 'mongodb://localhost/CarServiceDB'

const connectDB = async () => {
    try {
            await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log("DataBase Connected")
    }
    catch (err) {
        console.log("Connect is not established")
    }
}

module.exports = connectDB