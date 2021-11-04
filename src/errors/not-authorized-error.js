const CustomError = require('./custom-error');

class NotAuthorizedError extends CustomError {
    
    constructor() {
        super("Not authorized");
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

}

module.exports = NotAuthorizedError;