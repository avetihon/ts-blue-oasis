class CustomError extends Error {

    constructor(code, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
    }
}

module.exports = CustomError;
