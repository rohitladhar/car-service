const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    available: {
        type: Number,
        required: true,
    },
    booked: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model('Booking', bookingSchema)




