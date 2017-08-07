const HTTPStatusCodes = require('../config/HTTPStatusCodes');

const helloServer = (request, response) => {
    response.status(HTTPStatusCodes.OK).json({ success: true });
};

module.exports = {
    helloServer
};
