const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

const db = require('../databaseWrapper/database');
const Model = require('../databaseWrapper/model');
const ErrorCodeList = require('../config/errorCodeList');

const SALT_ROUND = 5;
const ROLE = 'admin';

class User extends Model {
    constructor(fields) {
        super(fields);
    }

    signIn() {
        return this.collection.findOne({ username: this.fields.username }).then(user => {
            if (user === null) {
                return {
                    success: false,
                    errorCode: ErrorCodeList.USER_NOT_FOUND
                }
            }

            return this.comparePassword(this.fields.password, user.password).then(result => {
                if (result === false) {
                    return {
                        success: false,
                        errorCode: ErrorCodeList.INCORRECT_PASSWORD
                    }
                }

                return {
                    success: true,
                    token: jsonWebToken.sign(this.fields, process.env.TOKEN_SECRET, { expiresIn: '1h' })
                }
            });
        });
    }

    signUp() {
        let username = this.fields.username;
        let password = this.fields.password;
        return this.hashPassword(password).then((passwordHash) => {
            return this.collection.save({
                username: username,
                password: passwordHash,
                role: ROLE
            });
        });
    }

    hashPassword(password) {
        return bcrypt.hash(password, SALT_ROUND);
    }

    comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
}

db.register(User);

module.exports = User;
