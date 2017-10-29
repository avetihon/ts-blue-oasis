require('dotenv-safe').config({
    sample: './.env'
});
const VError = require('./VError');
const ERROR_CODE_LIST = require('./constants/ErrorCodeList');
const objectTraverse = require('../utils/objectTraverse');

let __settings;

class Settings {
    constructor() {}

    static get settings() {
        return __settings;
    }

    static load() {
        const settingsObject = {
            mongo: {
                uri: process.env.MONGODB_URI,
                user: process.env.MONGODB_USER,
                password: process.env.MONGODB_PASSWORD,
                database: process.env.MONGODB_DATABASE
            },
            http: {
                port: process.env.HTTP_PORT,
                api: {
                    prefix: {
                        public: process.env.HTTP_API_PREFIX,
                        private: process.env.HTTP_API_PRIVATE_PREFIX
                    }
                }
            },
            token: {
                secret: process.env.TOKEN_SECRET,
                expiration: process.env.TOKEN_EXPIRATION
            }
        };

        objectTraverse(settingsObject, (key, value) => {
            if (value === void 0) {
                throw new VError(ERROR_CODE_LIST.RESOLVE_SETTING_LIST_ERROR, `Failed to load property '${key}' of project from .env`);
            }
        });

        Object.freeze(__settings = settingsObject);

        return __settings;
    }

}

module.exports = Settings;
