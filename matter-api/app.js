const express = require('express');
const app = express();
const cors = require('cors');
const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/users-mod");
require ("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

mongoose.connect(process.env.MONGO_URL)

app.get("/api/test", (request, response) => {
    response.json("test okay")
})

app.post("/api/create-an-account", async (request, response) => {

    const {first_name, last_name, email, password, location} = request.body;

    const userDoc = await User.create({
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
        location
    })
    response.json(userDoc)
})

console.log("app.js is up and running!")


// To capture all bad URLs
app.all('*', (request, response) => {
    response.status(404).send({message: 'path not found this time'})
})

module.exports = app