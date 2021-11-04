const CustomError = require('./custom-error');

class NotFoundError extends CustomError {
    
    constructor(message) {
        if(!message)
            super("Not found.");
        else
            super(message);
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

}

module.exports = NotFoundError;