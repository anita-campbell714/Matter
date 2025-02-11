// // const { registerAccount } = require("../models/users-mod");

// exports.createAccount = (request, response, next) => {
//     const {first_name, last_name, email, password, location} = request.body;

//     console.log(response)

//     response.json(first_name, last_name, email, password, location)

//         // const newCreateAccount = {
//         //     first_name,
//         //     last_name,
//         //     email,
//         //     password,
//         //     location
//         // }

//         // try {
//         //     const newUser = await registerAccount(newCreateAccount);
//         //     console.log("hello from the controller!", newUser)
//         // } catch (error) {
//         //     console.error("Error creating account", error);
//         //     response.status(500).send("Error creating account")
//         //     next(error)
//         // }
//         // return registerAccount(first_name, last_name, email, password, location)
//         // .then((response) => {
//         //     response.status(201).send()
//         // })
// }