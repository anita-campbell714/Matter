const data = require("../db/seed/data/test");
const {seedMongoDB} = require("../db/seed/seed");
const config = require("../config");
const {
    connectToMongo,
    disconnectFromMongo,
  } = require("../db/mongodb-connection");
const request = require("supertest");
const app = require('../app');
// const endpoints = require("../controllers/endpoints");
require("jest-extended");

beforeEach(async () => {
    testData = await seedMongoDB(data);
  });
  
  beforeAll(async () => {
    await connectToMongo(config.mongo.uri);
  });
  
  afterAll(async () => {
    await disconnectFromMongo();
  });

describe("invalid endpoint", () => {
test("404 status and error message when given an endpoint that doesn't exist", () => {
    return request(app)
    .get("api/not-a-route")
    .expect(404)
    .then((response) => {
        expect(response.body.message).toBe("path not found");
    });
});
});