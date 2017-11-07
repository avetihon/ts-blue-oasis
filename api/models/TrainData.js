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
                    x: { $max: '$x' },
                    y: { $max: '$y' },
                    z: { $max: '$z' }
                }
        }]).toArray();
    }

    getMinimum() {
        return this.collection.aggregate([{
            $group:
                {
                    _id : null,
                    x: { $min: '$x' },
                    y: { $min: '$y' },
                    z: { $min: '$z' }
                }
        }]).toArray();
    }

    aggregatedByMovementType() {
        return this.collection.aggregate([
            {
                $group: {
                    _id: '$movementType',
                    x: { $push: '$x' },
                    y: { $push: '$y' },
                    z: { $push: '$z' }
                }
            }, {
                $project: {
                    x: { $slice: [ '$x', 200 ] },
                    y: { $slice: [ '$y', 200 ] },
                    z: { $slice: [ '$z', 200 ] },
                }
            }
        ]).toArray();
    }
}

db.registerModel(TrainData);

module.exports = TrainData;
