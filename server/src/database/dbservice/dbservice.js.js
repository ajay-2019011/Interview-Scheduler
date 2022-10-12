const mongoose = require('mongoose')
const configuration = require('../configuration/config')
const constants = require('../../constants/constants')
const Exception = require('../../utils/classes/Exception')

    const connect = async() =>
    {
        try
        {
            await mongoose.connect(configuration.DATABASE_URI,{
                useUnifiedTopology: true,
                useNewUrlParser: true
            });

            console.log(`Connection opened to ${configuration.DATABASE_NAME} database`);
        }
        catch(exception)
        {
            await mongoose.connection.close();

            console.log(exception)

            throw new Exception(constants.DB_CONNECTION_ERROR.Code, constants.DB_CONNECTION_ERROR.Message)
        }
    }

    const disconnect = async() =>
    {
        try
        {
            await mongoose.disconnect();
            
            console.log(`Connection closed to ${config.DB_NAME} database`);
        }
        catch(err)
        {
            await mongoose.connection.close();

            throw new Exception(constants.DB_DISCONNECT_ERROR.Code, constants.DB_DISCONNECT_ERROR.Message)
        }
    }

module.exports = {connect, disconnect}