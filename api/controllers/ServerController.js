const wrapResponse = require('../helpers/wrapResponse');

const helloServer = () => {
    return Promise.resolve(null);
};

module.exports = {
    helloServer: wrapResponse(helloServer)
};
