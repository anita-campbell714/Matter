const data = require("../seed/data")
const { seedMongoDB } = require("./seed")

seedMongoDB(data)
.then(() => {
    console.log("Test database seeded successfully.")
})
.catch((err) => {
    console.error("Error seeding test database:", err)
})