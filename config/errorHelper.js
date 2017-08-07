class ErrorHelper {
    static delimiter = ':';

    static create(errorCode, message = '') {
        return new Error(String(errorCode).concat(ErrorHelper.delimiter, ' ', message));
    }

    static getErrorCode() {}

    static getErrorMessage() {}
}

module.exports = ErrorHelper;
