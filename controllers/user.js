const User = require('../models/user');
const HTTPStatusCodes = require('../config/HTTPStatusCodes');

const getUser = (request, response) => {
    const json = {
        success: true,
        user: null
    };

    if (request.user !== void 0) {
        const user = new User({_id: request.user._id});
        user.getData().then(data => {
            json.user = data;
            response
                .status(HTTPStatusCodes.OK)
                .json(json);
        });
    } else {
        response
            .status(HTTPStatusCodes.OK)
            .json(json);
    }
};

module.exports = {
    getUser
};
