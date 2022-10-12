const constants = require('../../constants/constants')

class Exception
{
    constructor(code, message)
    {
        this.status = constants.FAILURE;
        this.code = code;
        this.message = message
    }
}

module.exports = Exception