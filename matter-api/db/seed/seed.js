const config = require("../../config")
const { MongoClient } = require("mongodb")

const uri = config.mongo.uri

const client = new MongoClient(uri, {
    useNewUrlParser: true,
});

const seedCollection = async (db, data, name) => {
    const collection = db.collection(name)
    await collection.deleteMany({}) // pass in an empty object to delete all documents in the collection
    if(data.length === 0) {
        return []
    }
    const result = await collection.insertMany(data)
    return await collection.find().toArray()
}

console.log(uri)

const seedMongoDB = async ({users}) => {
    try {
        await client.connect()
        console.log("Connected correctly to server");

        let db = client.db("matter-unit-testing2");
        
        // Drop the database
        const dropResult = await db.dropDatabase()
        db = client.db("matter-unit-testing2")

        // Seed users
        const newUsers = await seedCollection(db, users, "users")

        return { users: newUsers }

    } catch (error) {
        console.log("Error during database seeding", (error))
    } finally {
        await client.close()
    }
}

module.exports = { seedMongoDB }















// const seedCollection = async (db, data, name) => {
//   const collection = db.collection(name)
//   await collection.deleteMany({});
//   if (data.length === 0) {
//     return []
//   }
//   const result = await collection.insertMany(data);
//   return await collection.find().toArray()
// }

// const seedMongoDB = async ({users, events}) => {
//     try {
//       await client.connect()
//       let db = client.db(config.mongo.uri)

//       // Drop the database
//       const dropResult = await db.dropDatabase()
//       db = client.db(config.mongo.uri)

//       // Seed users
//       const newUsers = await seedCollection(db, users, 'users')

//       // Seed events
//       const usersByUserId = new Map(newUsers.map(user => [user._id, user]))
//       const eventsToInsert = events.map(event => {
//         const userId = usersByUserId.get(event.user)._id
//         return { ...event, user: userId }
//       })
//       const newEvents = await seedCollection(db, eventsToInsert, 'events')


//       console.log('Database seeding complete.')

//       return {users: newUsers}
//     } catch (err) {
//       console.error("Error during database seeding:", err);
//     } finally {
//       await client.close();
//     }
//   };

//   module.exports = { seedMongoDB };