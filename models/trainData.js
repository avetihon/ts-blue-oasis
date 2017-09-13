const db = require('../databaseWrapper/database');
const Model = require('../databaseWrapper/model');

class TrainData extends Model {
    constructor(fields) {
        super(fields);
    }

    save() {
        return this.collection.insertMany(this.fields);
    }
}

db.register(TrainData);

module.exports = TrainData;
