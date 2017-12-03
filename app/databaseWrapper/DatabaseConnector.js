const MongoClient = require('mongodb').MongoClient;
const EventEmitter = require('events').EventEmitter;
const DATABASE_EVENT_LIST = require('../constants/DatabaseEventList');
const DATABASE_STATE_LIST = require('../constants/DatabaseStateList');

class DatabaseConnector extends EventEmitter {
    constructor() {
        super();
        this.state = DATABASE_STATE_LIST.STATE_DISCONNECTED;
        this.models = [];
    }

    connect(url) {
        if (this._connection) {
            return Promise.resolve(this._connection);
        }

        this.state = DATABASE_STATE_LIST.STATE_CONNECTING;

        this._connectionPromise = MongoClient.connect(url)
            .then(db => {
                this.state = DATABASE_STATE_LIST.STATE_CONNECTED;
                this._connection = db;
                this._compileModels();
                this.emit(DATABASE_EVENT_LIST.OPEN);

                return db;
            })
            .catch(error => console.error(error));

        return this._connectionPromise;
    }

    connection() {
        if (this.state === DATABASE_STATE_LIST.STATE_DISCONNECTED) {
            return Promise.reject(new Error('Database is disconnected.'));
        }

        if (this.state === DATABASE_STATE_LIST.STATE_CONNECTED) {
            return Promise.resolve(this._connection);
        }

        if (this.state === DATABASE_STATE_LIST.STATE_CONNECTING) {
            return this._connectionPromise;
        }
    }

    disconnect() {
        return this.connection()
            .then(db => {
                db.close();
                this.emit(DATABASE_EVENT_LIST.CLOSE);
                this.state = DATABASE_STATE_LIST.STATE_DISCONNECTED;
            });
    }

    registerModel(model) {
        model.prototype._database = this;
        this.models.push(model);
    }

    _compileModels() {
        let i;
        let length;

        for (i = 0, length = this.models.length; i < length; i += 1) {
            this.models[i].prototype._connection = this._connection;
        }
    }
}

module.exports = new DatabaseConnector();

