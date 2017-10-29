const User = require('../models/User');
const wrapResponse = require('../helpers/wrapResponse');

const getUser = (request) => {
    const body = request.user;
    const user = new User({_id: body._id});
    return user.getData();
};

module.exports = {
    getUser: wrapResponse(getUser)
};
