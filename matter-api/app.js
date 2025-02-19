const express = require('express');
const app = express();
const cors = require('cors');
const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const User = require("./models/users.mod");
const cookieParser = require("cookie-parser");
require ("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "odsnsfkdsbfosdjfsdk"

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

mongoose.connect(process.env.MONGO_URL)

app.get("/api/test", (request, response) => {
    response.json("test okay")
})

app.post("/api/create-an-account", async (request, response) => {

    const {firstName, lastName, email, password, location} = request.body;

    try {
        const userDoc = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            location
        })
        response.json(userDoc)
    }
    catch (error){
        response.status(422).json(error)
    }
})

app.post("/api/login", async (request, response) => {
    const {email, password} = request.body
    const userDoc = await User.findOne({email: email})

    if (userDoc){
        const passwordCorrect = bcrypt.compareSync(password, userDoc.password)
        if(passwordCorrect){
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
            }, jwtSecret, {}, (error, token) => {
                if(error) throw error;
                response.cookie("token", token).json(userDoc)
            })
        }
        else {
            response.status(422).json("password incorrect")
        }
    }
})

app.get("/api/profile", (request, response) => {
    const {token} = request.cookies
    if(token){
        jwt.verify(token, jwtSecret, {}, async (error, userData) => {
            if(error) throw error;
            const {firstName, email, _id} = await User.findById(userData.id)
            response.json({firstName, email, _id})
        })
    }
    else {
        response.json(null)
    }
})

app.post("/api/logout", (request, response) => {
    response.cookie("token", "").json(true)
})

// test@email.com
// test

// ymoyo@gmail.com
// yolo

// staff@matter.com
// staff

// management@matter.com
// staff

console.log("app.js is up and running!")


// To capture all bad URLs
app.all('*', (request, response) => {
    response.status(404).send({message: 'path not found this time'})
})

module.exports = app

