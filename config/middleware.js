const errorHandler = require('./middlewares/errorHandler');
const verifyAccessToken = require('./middlewares/verifyAccessToken');

module.exports = {
    errorHandler,
    verifyAccessToken
};
