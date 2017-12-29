const wrapResponse = require('../helpers/wrapResponse');

const recognition = () => {
    let obj = {};
    for (let i = 0; i < 1500000; i += 1) {
        obj.a = i;
    }
    return Promise.resolve({type: 'Jumping'});
};

module.exports = {
    recognition: wrapResponse(recognition)
};
