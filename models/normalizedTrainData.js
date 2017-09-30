const db = require('../databaseWrapper/database');
const Model = require('../databaseWrapper/model');

class NormalizedTrainData extends Model {
    constructor(fields) {
        super(fields);
    }

    remove() {
        return this.collection.remove({});
    }

    save() {
        return this.collection.insertMany(this.fields);
    }
}

db.register(NormalizedTrainData);

module.exports = NormalizedTrainData;
