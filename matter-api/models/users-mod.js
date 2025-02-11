// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const accountSchema = new Schema({
//     first_name: {type: String, required: true},
//     last_name: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, required: true},
//     location: {type: String, required: true}
// })

// const Account = mongoose.model("Account", accountSchema);

// exports.registerAccount = (registerNewAccount) => {
//     return new Account(registerNewAccount).save().catch((error) => {
//         console.log("hello from the model!", registerNewAccount)
//         console.error("Error creating account", error);
//         throw error;
//     });
// }