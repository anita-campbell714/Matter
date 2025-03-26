const data = require("../db/seed/data/test/index.js")
const { seedMongoDB } = require("../db/seed/seed.js")
const config = require("../config")
const { connectToMongo, disconnectFromMongo } = require("../db/mongodb-connection");
const request = require("supertest");
const app = require('../app');
const bcrypt = require("bcryptjs")

require("jest-extended")

let testData = {}

beforeEach(async () => {
    testData = await seedMongoDB(data);
  });

beforeAll(async () => {
    // Connect to MongoDB Atlas test cluster
    await connectToMongo(config.mongo.uri);
})

afterAll(async () => {
    // Disconnect from MongoDB Atlas test cluster
    await disconnectFromMongo();
  });

//   console.log(testData)

describe("Invalid endpoint", () => {
    test("404 status and error message when given an endpoint that doesn't exist", () => {
        return request(app)
        .get("/api/not-a-route")
        .expect(404)
        .then((response) => {
            expect(response.body.message).toBe("path not found this time");
        });
    });
});

//POST REQUESTS ---------------- //

describe("POST /api/create-an-account", () => {
    test("returns status 200: creates a new user account", () => {
        const newUser = {
            firstName: "test",
            lastName: "test",
            email: "",
            password: "thisismypassword",
            location: "New York, USA"
        }
        newUser.email = Math.random().toString(36).slice(-10) + "@gmail.com";

        return request(app)
        .post("/api/create-an-account")
        .send(newUser)
        .expect(200)
        .then((response) => {
            expect(response.body.email).toHaveLength(20)
        });
    });

    test("returns status 422: and error message when the inputted email address already exists in the database: duplicate key, an account has already been created with this email address", () => {
        const newUser = {
            firstName: "test",
            lastName: "test",
            email: "we4h01oi48@gmail.com",
            password: "test",
            location: "test"
        }
        return request(app)
        .post("/api/create-an-account")
        .send(newUser)
        .expect(422)
        .then((response) => {
            const dupliacteEmailAddress = response.body.errorResponse.keyValue.email
            const mongoErrorCode = response.body.errorResponse.code
            expect(dupliacteEmailAddress).toBe(newUser.email)
            expect(mongoErrorCode).toBe(11000)
        })
})
})

describe("POST /api/login", () => {
    test("returns status 200: logs user into their account", () => {
        const existingUser = {
            email: "we4h01oi48@gmail.com",
            password: "test",
        }
        return request(app)
        .post("/api/login")
        .send(existingUser)
        .expect(200)
        .then((response) => {
            expect(response.body.email).toBe(existingUser.email)
        })
    })
})
