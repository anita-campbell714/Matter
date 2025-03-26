const config = require("../../config")
const { MongoClient } = require("mongodb")

const uri = config.mongo.uri

const client = new MongoClient(uri)

const seedCollection = async (db, data, name) => {
    // if(data.length === 0) {
    //     return [[]]
    // }
    const collection = db.collection(name)
    await collection.deleteMany({}) // pass in an empty object to delete all documents in the collection
    await collection.insertOne(data)
    return await collection.find().toArray()
}

const seedMongoDB = async (users, events) => {
    try {
        await client.connect()
        console.log("Connected correctly to server");

        let db = client.db("matter-1-test-database");

        // Drop the database
        const dropResult = await db.dropDatabase()
        db = client.db("matter-1-test-database")

        // Seed users
        const newUsers = await seedCollection(db, users, "users")
    
        // Seed events
        const newEvents = await seedCollection(db, events, "events")

    // const eachUser = (users.usersData.map((user) => {
    //     console.log(user)
    //     }))
        return { users: newUsers, events: newEvents }

    } catch (error) {
        console.log("Error during database seeding", (error))
    } finally {
        await client.close()
    }
}

module.exports = { seedMongoDB }