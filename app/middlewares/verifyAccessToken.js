const jsonWebToken = require('jsonwebtoken');
const settings = require('../settings').load();
const VError = require('../VError');
const ERROR_CODE_LIST = require('../constants/ErrorCodeList');

const verifyAccessToken = (request, response, next) => {
    let token;

    if (request.headers && request.headers.authorization) {
        const parts = request.headers.authorization.split(' ');

        if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        }

        if (token === void 0) {
            return next(new VError(ERROR_CODE_LIST.AUTHORIZATION_TOKEN_ERROR, 'Format is Authorization: Bearer [token]'));
        }
    }

    if (token === void 0) {
        return next(new VError(ERROR_CODE_LIST.AUTHORIZATION_TOKEN_ERROR, 'No authorization token was found'));
    }

    jsonWebToken.verify(token, settings.token.secret, (error, decode) => {
        if (error) {
            return next(new VError(ERROR_CODE_LIST.AUTHORIZATION_TOKEN_ERROR, 'Incorrect authorization token'));
        }

        request.user = decode;
        return next();
    });
};

module.exports = verifyAccessToken;
