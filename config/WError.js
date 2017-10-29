const VError = require('./VError');

/**
 * A WError class for API error
 * @class
 */
class WError extends VError {

    /**
     * Constructs the WError class
     * @param {Number} status an HTTP status code
     * @param {Number} code an error code
     * @param {String} message an error message
     * @constructor
     */
    constructor(status, code, message) {
        super(code, message);
        this.status = status;
    }
}

module.exports = WError;
