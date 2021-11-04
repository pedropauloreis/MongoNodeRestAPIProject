const CustomError = require('./custom-error');

class DatabaseConnectionError extends CustomError {
    
    constructor() {
        super("Error connecting to database");
        this.statusCode = 500;
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

}

module.exports = DatabaseConnectionError;