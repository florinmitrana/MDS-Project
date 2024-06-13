const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    restaurant:{
        type:String
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    maxCount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
});

const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = bookingModel;
