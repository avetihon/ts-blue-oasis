const settings = require('../settings').settings;

class URL {
    constructor() {}

    static get mongodbPrefix() {
        return 'mongodb://';
    }

    static build() {
        return URL.mongodbPrefix + settings.mongo.user
        + ':' + settings.mongo.password
        + '@' + settings.mongo.uri
        + '/' + settings.mongo.database
    }
}

module.exports = URL;
