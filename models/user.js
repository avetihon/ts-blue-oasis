const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;

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
                    code: ErrorCodeList.USER_NOT_FOUND,
                    message: 'Couldn\'t find the user'
                }
            }

            return this.comparePassword(this.fields.password, user.password).then(result => {
                if (result === false) {
                    return {
                        success: false,
                        code: ErrorCodeList.INCORRECT_PASSWORD,
                        message: 'Incorrect password'
                    }
                }

                delete user.password; // this field doesn't need in client side

                return {
                    success: true,
                    user: user,
                    token: jsonWebToken.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1h' })
                }
            });
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
        return this.collection.findOne({ _id: ObjectID(this.fields._id) }, { password: 0 });
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
