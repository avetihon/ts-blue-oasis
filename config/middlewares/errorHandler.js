const ERROR_CODE_LIST = require('../constants/ErrorCodeList');
const HTTP_STATUS_CODE_LIST = require('../constants/HTTPStatusCodeList');

const errorHandler = (error, request, response, next) => {
    switch (error.code) {
        case ERROR_CODE_LIST.AUTHORIZATION_TOKEN_ERROR: {
            return response
                .status(HTTP_STATUS_CODE_LIST.FORBIDDEN)
                .json({
                    success: false,
                    code: error.code,
                    message: error.message
                });
        }
    }

    next();
};

module.exports = errorHandler;
