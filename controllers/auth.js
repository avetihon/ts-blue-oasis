const User = require('../models/user');
const HTTPStatusCodes = require('../config/HTTPStatusCodes');

const signIn = (request, response) => {
    let body = request.body;
    let user = new User({ username: body.username, password: body.password });
    user.signIn().then(result => {
        if (result.success === false) {
            response
                .status(HTTPStatusCodes.UNAUTHORIZED)
                .json(result);
        } else {
            response
                .status(HTTPStatusCodes.OK)
                .json(result);
        }
    });
};

module.exports = {
    signIn
};
