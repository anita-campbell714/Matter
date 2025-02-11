// const config = require('../../config')
// const { MongoClient } = require('mongodb')

// const client = new MongoClient(config.mongo.uri)

// const seedCollection = async (db, data, name) => {
//   const collection = db.collection(name)
//   await collection.deleteMany({});
//   if (data.length === 0) {
//     return []
//   }
//   const result = await collection.insertMany(data);
//   return await collection.find().toArray()
// }