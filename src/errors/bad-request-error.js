const CustomError = require('./custom-error');

class BadRequestError extends CustomError {
 
    constructor(message) {
        super(message);
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

}

module.exports = BadRequestError;