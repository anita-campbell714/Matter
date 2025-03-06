const config = require("../../config")
const { MongoClient } = require("mongodb")

const uri = config.mongo.uri

const client = new MongoClient(uri)

const seedCollection = async (db, data, name) => {
    const collection = db.collection(name)
    await collection.deleteMany({}) // pass in an empty object to delete all documents in the collection
    if(data.length === 0) {
        return [[]]
    }
    const result = await collection.insertOne(data)
    return await collection.find().toArray()
}

// console.log(uri)

const seedMongoDB = async (users) => {
    try {
        await client.connect()
        console.log("Connected correctly to server");

        let db = client.db("matter-unit-testing2");

        // Drop the database
        const dropResult = await db.dropDatabase()
        db = client.db("matter-unit-testing2")

        // Seed users
        const newUsers = await seedCollection(db, users, "users")

        // console.log({ users: newUsers._id })
        return { users: newUsers }

    } catch (error) {
        console.log("Error during database seeding", (error))
    } finally {
        await client.close()
    }
}

module.exports = { seedMongoDB }