class ErrorCodeList {}

/* Client Auth Error */
ErrorCodeList.USER_NOT_FOUND = 200;
ErrorCodeList.INCORRECT_PASSWORD = 201;
ErrorCodeList.AUTHORIZATION_TOKEN_ERROR = 202;

/* Server Data Error */

ErrorCodeList.UNEXPECTED_DATA_ERROR = 300;

module.exports = ErrorCodeList;
