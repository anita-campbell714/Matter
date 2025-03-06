const dotenv = require('dotenv');

const ENV = process.env.NODE_ENV;
if (ENV) {
    const configFile = `${__dirname}/../.env.${ENV}`
    console.log(`Using config file ${configFile}`);
    dotenv.config({ path: configFile });
}

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const jwtSecret = process.env.JWT_SECRET

let mongoUri = process.env.MONGO_HOST

if (mongoUser && mongoPassword) {
    mongoUri = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoUri}`
}

module.exports = {
    server: {
        port: process.env.PORT || 4000
    },
    mongo: {
        uri: mongoUri,
    },
    jwt: {
        secret: jwtSecret
    }
}