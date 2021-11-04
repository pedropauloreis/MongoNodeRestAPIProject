class CustomError extends Error {
    
    constructor(message){
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    serializeErrors(){
        return [{message: this.message}];
    }
    
}

module.exports = CustomError;

