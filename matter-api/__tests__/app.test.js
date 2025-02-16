// const data = require("../db/seed/data/test");
// const {seedMongoDB} = require("../db/seed/seed");
// const config = require("../config");
// const {
//     connectToMongo,
//     disconnectFromMongo,
//   } = require("../db/mongodb-connection");
const app = require('../app');
const request = require("supertest");
// // const endpoints = require("../controllers/endpoints");
// require("jest-extended");

// beforeEach(async () => {
//     testData = await seedMongoDB(data);
//   });
  
//   beforeAll(async () => {
//     await connectToMongo(config.mongo.uri);
//   });
  
//   afterAll(async () => {
//     await disconnectFromMongo();
//   });

describe("invalid endpoint", () => {
    test("404 status and error message when given an endpoint that doesn't exist", () => {
        return request(app)
        .get("/api/not-a-route")
        .expect(404)
        .then((response) => {
            expect(response.body.message).toBe("path not found this time");
        });
    });
});

describe("GET /api/test", () => {
    test("returns a 200 status and a message", () => {
        return request(app)
        .get("/api/test")
        .expect(200)
        .then((response) => {
            expect(response.body).toBe("test okay");
        });
    });
});

describe("POST /api/create-an-account", () => {
    test("returns status 200: creates a new user account", () => {
        const newUser = {
            first_name: "Yoliswa",
            last_name: "Moyo",
            email: "yoliswa.moyo@example.com",
            password: "hashedpassword456",
            location: "London, UK"
        }
        return request(app)
        .post("/api/create-an-account")
        .send(newUser)
        .expect(200)
        .then((response) => {
            console.log("test post request")
            expect(response.body).toEqual(newUser);
        });
    });
});