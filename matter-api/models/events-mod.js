const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema ({
    "title": {type: String},
    "ages": {type: String},
    "eventDate": {type: String},
    "startTime": {type:Number},
    "endTime": {type: Number},
    "address": {type: String},
    "price": {type: String},
    "category": {type: String},
    "description": {type: String},
    "owner": {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    "posted_date": {type: String},
    "cover_image": {type: String},
    "available": {type: String}
})

const EventModel = mongoose.model("Event", eventSchema)

module.exports = EventModel;