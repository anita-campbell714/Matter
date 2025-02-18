// // const { registerAccount } = require("../models/users-mod");

// exports.createAccount = (request, response, next) => {
//     const {firstName, lastName, email, password, location} = request.body;

//     console.log(response)

//     response.json(firstName, lastName, email, password, location)

//         // const newCreateAccount = {
//         //     firstName,
//         //     lastName,
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
//         // return registerAccount(firstName, lastName, email, password, location)
//         // .then((response) => {
//         //     response.status(201).send()
//         // })
// }