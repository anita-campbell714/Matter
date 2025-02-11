const express = require('express');
const app = express();
const cors = require('cors');
// const { createAccount } = require("./controllers/users-cont");

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.get("/api/test", (request, response) => {
  response.json("test okay")
})

// app.post("/api/create-an-account", createAccount)
app.post("/api/create-an-account", (request, response) => {
    const {first_name, last_name, email, password, location} = request.body;

    response.json({
        first_name,
        last_name,
        email,
        password,
        location,
    })
})


console.log("app.js is up and running!")





// To capture all bad URLs
app.all('*', (request, response, next) => {
    response.status(404).send({message: 'path not found'})
})

module.exports = app