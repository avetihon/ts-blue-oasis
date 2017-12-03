const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;

const settings = require('../../app/settings').settings;
const db = require('../../app/databaseWrapper/DatabaseConnector');
const Model = require('../../app/databaseWrapper/Model');
const WError = require('../../app/WError');
const ERROR_CODE_LIST = require('../../app/constants/ErrorCodeList');
const HTTP_STATUS_CODE_LIST = require('../../app/constants/HTTPStatusCodeList');

const SALT_ROUND = 5;
const ROLE = 'admin';

class User extends Model {
    constructor(fields) {
        super(fields);
    }

    signIn() {
        let __user;
        return this.collection
            .findOne({username: this.fields.username})
            .then(user => {
                if (user === null) {
                    throw new WError(
                        HTTP_STATUS_CODE_LIST.UNPROCESSABLE_ENTITY,
                        ERROR_CODE_LIST.USER_NOT_FOUND,
                        'Couldn\'t find the user'
                    );
                }

                __user = user;

                return this.comparePassword(this.fields.password, user.password);
            }).then(result => {
                if (result === false) {
                    throw new WError(
                        HTTP_STATUS_CODE_LIST.UNPROCESSABLE_ENTITY,
                        ERROR_CODE_LIST.INCORRECT_PASSWORD,
                        'Incorrect password'
                    );
                }

                delete __user.password; // this field doesn't need in client side

                return {
                    user: __user,
                    token: jsonWebToken.sign(__user, settings.token.secret, {
                        expiresIn: settings.token.expiration
                    })
                }
            });
    }

    signUp() {
        let username = this.fields.username;
        let password = this.fields.password;
        return this.hashPassword(password).then((passwordHash) => {
            return this.collection.insertOne({
                username: username,
                password: passwordHash,
                role: ROLE
            });
        });
    }

    getData() {
        return this.collection.findOne({_id: ObjectID(this.fields._id)}, {password: 0});
    }

    hashPassword(password) {
        return bcrypt.hash(password, SALT_ROUND);
    }

    comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
}

db.registerModel(User);

module.exports = User;
