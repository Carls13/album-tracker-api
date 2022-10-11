require('dotenv').config();

const config = {
    dbUrl: process.env.DB_URL,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    port: parseInt(process.env.PORT)
}

module.exports = config;