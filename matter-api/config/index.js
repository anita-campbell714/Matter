const dotenv = require('dotenv');

const ENV = process.env.NODE_ENV;
if (ENV) {
    const configFile = `${__dirname}/../.env.${ENV}`
    console.log(`Using config file ${configFile}`);
    dotenv.config({ path: configFile });
}

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoPort = process.env.MONGO_PORT;
const mongoDB = process.env.MONGO_DB || 'shelfshare';

let mongoUri = process.env.MONGO_HOST

if (mongoUser && mongoPassword) {
    mongoUri = `${mongoUser}:${mongoPassword}@${mongoUri}`
}

if (mongoPort) {
    mongoUri = `mongodb://${mongoUri}:${mongoPort}/${mongoDB}`
} else {
    mongoUri = `mongodb+srv://${mongoUri}/${mongoDB}`
}

module.exports = {
    server: {
        port: process.env.PORT || 3000
    },
    mongo: {
        uri: mongoUri,
        dbName: mongoDB
    }
}