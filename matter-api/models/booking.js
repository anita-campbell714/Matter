const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema ({
    "eventId": {type: mongoose.Schema.Types.ObjectId, required:true},
    "totalPrice": {type: Number, required:true},
    "quantity": {type: Number, required:true},
    "name": {type: String, required:true},
    "number": {type:Number, required:true},
    "email": {type: String, required: true},
})

const BookingModel = mongoose.model("booking", bookingSchema)

module.exports = BookingModel;