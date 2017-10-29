const db = require('../../config/databaseWrapper/DatabaseConnector');
const Model = require('../../config/databaseWrapper/Model');

class TrainData extends Model {
    constructor(fields) {
        super(fields);
    }

    save() {
        //this.fields = [{data: {x: 0, y: 0, z: 0}, movementType: null}]
        return this.collection.insertMany(this.fields);
    }

    getAll() {
        return this.collection.find({}).toArray();
    }

    getByType() {
        return this.collection.find({ movementType: this.fields.movementType }).toArray();
    }

    getMaximum() {
        return this.collection.aggregate([{
            $group:
                {
                    _id : null,
                    x: { $max: "$data.x" },
                    y: { $max: "$data.y" },
                    z: { $max: "$data.z" }
                }
        }]).toArray();
    }

    getMinimum() {
        return this.collection.aggregate([{
            $group:
                {
                    _id : null,
                    x: { $min: "$data.x" },
                    y: { $min: "$data.y" },
                    z: { $min: "$data.z" }
                }
        }]).toArray();
    }
}

db.registerModel(TrainData);

module.exports = TrainData;
