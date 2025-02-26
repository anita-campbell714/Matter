const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema ({
    "owner": {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    "title": {type: String},
    "age": {type: Number},
    "eventDate": {type: String},
    "startTime": {type:String},
    "endTime": {type: String},
    "address": {type: String},
    "price": {type: String},
    "maxGuests": {type: Number},
    "description": {type: String},
    "posted_date": {type: String},
    "image": {type: String},
    "category": {type: String},
    "available": {type: String}
})

const EventModel = mongoose.model("Event", eventSchema)

module.exports = EventModel;