const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {type: String, unique: true, required: true},
    password: {type:String, required: true},
    location: String
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

// const UserSchema = new Schema({
//     first_name: {type: String, required: true},
//     last_name: {type: String, required: true},
//     email: {type: String, unique: true, required: true},
//     password: {type: String, required: true},
//     location: {type: String}
// })

// const UserModel = mongoose.model("User", UserSchema);


// exports.registerAccount = (registerNewAccount) => {
//     return new Account(registerNewAccount).save().catch((error) => {
//         console.log("hello from the model!", registerNewAccount)
//         console.error("Error creating account", error);
//         throw error;
//     });
// }

// module.exports = UserModel;