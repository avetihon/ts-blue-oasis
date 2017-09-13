const ErrorCodeList = require('../config/errorCodeList');
const HTTPStatusCodes = require('../config/HTTPStatusCodes');

const errorHandler = (error, request, response, next) => {
    if (error.code === ErrorCodeList.AUTHORIZATION_TOKEN_ERROR) {
        return response.status(HTTPStatusCodes.FORBIDDEN)
                       .json({
                           success: false,
                           code: error.code,
                           message: error.message
                       });
    }

    next();
};

module.exports = errorHandler;
