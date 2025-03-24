const config = require("./config")
const {
    connectToMongo,
    disconnectFromMongo,
  } = require("./db/mongodb-connection.js");
const app = require("./app.js");

connectToMongo(config.mongo.uri)

const server = app.listen(config.server.port, () => console.log(`listening on PORT ${config.server.port}...`));

const gracefulShutdown = () => {
    console.log('Received termination signal, shutting down...')
    server.close(() => {
        console.log('Server is now closed')
        disconnectFromMongo()
    })
}
process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
