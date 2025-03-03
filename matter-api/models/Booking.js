const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema ({
    "place": {type: mongoose.Schema.Types.ObjectId, required:true, ref: "Place"},
    "user": {type: mongoose.Schema.Types.ObjectId, required:true},
    "name": {type: String, required:true},
    "phone": {type:String, required:true},
    "email": {type: String, required: true},
    "tickets": Number,
    "price": Number,
    "title": String,
    "eventDate": String,
    "startTime": String,
    "endTime": String,
    "address": String
})

const BookingModel = mongoose.model("Booking", bookingSchema)

module.exports = BookingModel;