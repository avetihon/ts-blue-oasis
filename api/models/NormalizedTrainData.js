const db = require('../../app/databaseWrapper/DatabaseConnector');
const Model = require('../../app/databaseWrapper/Model');

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

    getByType() {
        return this.collection.find({ movementType: this.fields.movementType }, { data: 1, _id: 0 }).toArray();
    }

    getNotByType() {
        return this.collection.find({ movementType: { $ne: this.fields.movementType } }, { data: 1, _id: 0 }).toArray();
    }
}

db.registerModel(NormalizedTrainData);

module.exports = NormalizedTrainData;
