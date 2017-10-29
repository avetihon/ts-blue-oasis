const WError = require('../../config/WError');
const HTTP_STATUS_CODE_LIST = require('../../config/constants/HTTPStatusCodeList');

const __wrapSuccess = (response, result) => response
    .status(HTTP_STATUS_CODE_LIST.OK)
    .json({
        success: true,
        data: result
    });

const __wrapError = (response, error) => {
    if (error instanceof WError) {
        return response
            .status(error.status)
            .json({
                success: false,
                code: error.code,
                message: error.message
            });
    }

    return response
        .status(HTTP_STATUS_CODE_LIST.INTERNAL_SERVER_ERROR)
        .json({
            success: false,
            message: error.message,
            code: ERROR_CODE_LIST.UNEXPECTED_DATA_ERROR
        });
};

const wrapResponse = fn => {
    return (request, response, next) => {
        return fn(request, response, next)
            .then(result => __wrapSuccess(response, result))
            .catch(error => __wrapError(response, error));
    }
};

module.exports = wrapResponse;
