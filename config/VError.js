/**
 * A VError class for internal Node error
 * @class
 */
class VError extends Error {

    /**
     * Constructs the VError class
     * @param {Number} code an error code
     * @param {String} message an error message
     * @constructor
     */
    constructor(code, message) {
        super(message);

        // properly capture stack trace in Node.js
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.message = message;
    }

    toString() {
        return 'AppError: ' + this.code + ' ' + this.message;
    }
}

module.exports = VError;
