const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    "firstName": {type: String},
    "lastName": {type: String},
    "email": {type: String, unique: true, required: true},
    "password": {type:String, required: true},
    "location": {type: String}
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;