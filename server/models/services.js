const mongoose = require('mongoose')
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: "Unchecked"
    }

})

const serviceModel = mongoose.model('Service', serviceSchema)

module.exports = serviceModel