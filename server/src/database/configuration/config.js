const dotenv = require('dotenv')

dotenv.config();

var config = {
    DATABASE_URI : process.env.MONGODB_CONNECTION_STRING,
    DATABASE_NAME : "Test Database"
}

module.exports = config;