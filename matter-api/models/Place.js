const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema ({
    "owner": {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    "title": {type: String},
    "age": {type: Number},
    "eventDate": {type: String},
    "startTime": {type:String},
    "endTime": {type: String},
    "address": {type: String},
    "price": {type: Number},
    "capacity": {type: Number},
    "description": {type: String},
    "images": {type: [String]},
    "additionalInfo": {type: [String]},
})

const EventModel = mongoose.model("Event", eventSchema)

module.exports = EventModel;