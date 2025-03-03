const app = require('../app');
const request = require("supertest");

describe("invalid endpoint", () => {
    test("returns status 404: and error message when given an endpoint that doesn't exist", () => {
        return request(app)
        .get("/api/not-a-route")
        .expect(404)
        .then((response) => {
            expect(response.body.message).toBe("path not found this time");
        });
    });
});

describe("GET /api/test", () => {
    test("returns status 200: and a message", () => {
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
            email: "davidhammerman@hotmail.com",
            password: "test",
            location: "test"
        }
        return request(app)
        .post("/api/create-an-account")
        .send(newUser)
        .expect(422)
        .then((response) => {
            const mongoErrorCode = response.body.errorResponse.code
            expect(mongoErrorCode).toBe(11000)
        })
    })
});

describe("POST /api/login", () => {
    test("returns status 200: logs user into their account", () => {
        const userLogin = {
            email: "ymoyo@email.com",
            password: "yolo"
        }
        return request(app)
        .post("/api/login")
        .send(userLogin)
        .expect(200)
        .then((response) => {
            console.log(response.body)
            expect(response.body).toBe("yolo")
        })
    })
    // test("", () => {

    // })
})


// describe("", () => {
//     test("", () => {

//     })
//     test("", () => {

//     })
// })