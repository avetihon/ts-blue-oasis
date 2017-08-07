const MongoClient = require('mongodb').MongoClient;
const EventEmitter = require('events').EventEmitter;

const STATE_CONNECTED = 0;
const STATE_CONNECTING = 1;
const STATE_DISCONNECTED = 2;

class Database extends EventEmitter {
    constructor() {
        super();
        this.state = STATE_DISCONNECTED;
        this.models = [];
    }

    connect(url) {
        if (this._connection) {
            return Promise.resolve(this._connection);
        }

        this.state = STATE_CONNECTING;

        this._connectionPromise = MongoClient.connect(url)
            .then(db => {
                this.state = STATE_CONNECTED;
                this._connection = db;
                this._compileModels();
                this.emit('open');

                return db;
            });

        return this._connectionPromise;
    }

    connection() {
        if (this.state === STATE_DISCONNECTED) {
            return Promise.reject(new Error('Database is disconnected.'));
        }

        if (this.state === STATE_CONNECTED) {
            return Promise.resolve(this._connection);
        }

        if (this.state === STATE_CONNECTING) {
            return this._connectionPromise;
        }
    }

    disconnect() {
        return this.connection()
            .then(db => {
                db.close();
                this.state = STATE_DISCONNECTED;
            });
    }

    register(model) {
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

module.exports = new Database();

