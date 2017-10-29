const User = require('../models/User');
const wrapResponse = require('../helpers/wrapResponse');

const signIn = (request) => {
    let body = request.body;
    let user = new User({ username: body.username, password: body.password });

    return user.signIn();
};

module.exports = {
    signIn: wrapResponse(signIn)
};
