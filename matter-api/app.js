const express = require('express');
const app = express();
const cors = require('cors');
const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {customErrorHandler, serverErrorHandler} = require("./error-handlers")
const mongoUri = require("./config").mongo.uri
const config = require("./config")
const endpoints = require("./endpoints.json")

const User = require("./models/User");
const Event = require("./models/Place");
const Booking = require("./models/Booking");

const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require ("dotenv").config({path: "./.env"});
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = config.jwt.secret

app.use(express.json());
app.use(cookieParser())
app.use("/api/uploads", express.static(__dirname+"/uploads"));
app.use(cors({
    credentials: true,
    origin: "https://matter-frontend.onrender.com"
}));

function getUserDataFromRequest(request){
    return new Promise((resolve, reject) => {
        jwt.verify(request.cookies.token, jwtSecret, {}, async (error, userData)=> {
            if(error) throw error
            resolve(userData)
        })
    })

}

app.get("/api", async(request, response) => {
    await response.json(endpoints)
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

app.post("/api/upload-by-link", async (request, response) => {
    const {link} = request.body
    const newName = "image" +  Date.now() + ".jpg"

    await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" + newName,
    })
    response.json(newName)
})

const imagesMiddleware = multer({dest: "uploads"})
app.post("/api/upload", imagesMiddleware.array("images", 100), (request, response) => {
    const uploadedFiles = []
    for (let i = 0; i < request.files.length; i++) {
        const {path, originalname} = request.files[i]
        const parts = originalname.split(".")
        const ext = parts[parts.length - 1]
        const newPath = path + "." + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace("uploads/", ""))
    }
    response.json(uploadedFiles)
})

app.post("/api/events", (request,response) => {
    const {token} = request.cookies
    const {title, age, eventDate, startTime, endTime, address, price, description, addedImages, additionalInfo, capacity} = request.body

    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
        if(error) throw error;
        const eventDoc = await Event.create({
            owner: userData.id,
            title,
            age,
            eventDate,
            startTime,
            endTime,
            address,
            price,
            capacity,
            description,
            images: addedImages,
            additionalInfo,
        })
        response.json(eventDoc)
    })
})

app.get("/api/user-events", async (request, response) => {
    const {token} = request.cookies
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
        const {id} = userData
        response.json(await Event.find({owner: id}))
    })
})

app.get("/api/events/:id", async (request, response) => {
    const {id} = request.params
    response.json(await Event.findById(id))
})

app.put("/api/events/", async (request, response) => {
    const {token} = request.cookies
    const {id, title, age, eventDate, startTime, endTime, address, price, description, addedImages, additionalInfo, capacity} = request.body

    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
        if(error) throw error;
        const eventDoc = await Event.findById(id)

        if(userData.id === eventDoc.owner.toString()){
            eventDoc.set({
            title,
            age,
            eventDate,
            startTime,
            endTime,
            address,
            price,
            capacity,
            description,
            images: addedImages,
            additionalInfo,
            })
            await eventDoc.save()
            response.json("okay")
        }
})
})

app.get("/api/events", async (request, response) => {
    response.json(await Event.find())
})

app.post("/api/bookings", async (request, response) => {
    const userData = await getUserDataFromRequest(request)
    const {place, name, phone, email, price, tickets, title, eventDate, startTime, endTime, address} = request.body

    Booking.create({
        place, name, phone, email, price, tickets, title, eventDate, startTime, endTime, address, user:userData.id
    }).then((doc) => {
        response.json(doc)
    }).catch((error) => {
        throw error;
    })
})

app.get("/api/bookings", async (request, response) => {
    const userData = await getUserDataFromRequest(request)
    response.json(await Booking.find({user:userData.id}))
})

// test@email.com
// test

// staff@matter.com
// staff

console.log("<<<<<<<<<<<<<<<<<<<app.js is up and running!")


// To capture all bad URLs
app.all('*', (request, response) => {
    response.status(404).send({message: 'path not found this time'})
})

app.use(customErrorHandler)
app.use(serverErrorHandler)

module.exports = app

