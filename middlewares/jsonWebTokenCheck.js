const jsonWebToken = require('jsonwebtoken');
const ErrorCodeList = require('../config/errorCodeList');
const CustomError = require('../config/customError');

const jsonWebTokenCheck = (request, response, next) => {
    let token;

    if (request.headers && request.headers.authorization) {
        const parts = request.headers.authorization.split(' ');

        if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            } else {
                return next(new CustomError(ErrorCodeList.AUTHORIZATION_TOKEN_ERROR, 'Format is Authorization: Bearer [token]'));
            }
        } else {
            return next(new CustomError(ErrorCodeList.AUTHORIZATION_TOKEN_ERROR, 'Format is Authorization: Bearer [token]'));
        }
    }

    if (token === void 0) {
        return next(new CustomError(ErrorCodeList.AUTHORIZATION_TOKEN_ERROR, 'No authorization token was found'));
    }

    jsonWebToken.verify(token, process.env.TOKEN_SECRET, (error, decode) => {
        request.user = decode;
        return next();
    });
};

module.exports = jsonWebTokenCheck;
