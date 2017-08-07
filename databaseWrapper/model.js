class Model {
    constructor(fields = {}) {
        this.fields = fields;
        this.collection = this._connection.collection(this.getCollectionName());
    }

    getConnection() {
        if (!this._database) {
            return Promise.reject(new Error('Model is not registered in a databaseWrapper.'));
        }

        return this._database.connection();
    }

    getCollection() {
        return this.getConnection()
            .then(db => {
                return db.collection(this.getCollectionName());
            });
    }

    getCollectionName() {
        return this.constructor.displayName || this.constructor.name
    }

    set(property, value) {
        this.fields[property] = value;
    }

    get(property) {
        return this.fields[property];
    }

    unset(property) {
        delete this.fields[property];
    }
}

module.exports = Model;
