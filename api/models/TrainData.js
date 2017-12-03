const db = require('../../app/databaseWrapper/DatabaseConnector');
const Model = require('../../app/databaseWrapper/Model');

const AGGREGATED_MOVEMENT_TYPE_LIMIT = 200;
const DEFAULT_FEATURE_LIMIT = 0;
const DEFAULT_FEATURE_SKIP = 0;

class TrainData extends Model {
    constructor(fields = {}) {
        super(fields);
        this.fields.limit = fields.limit || DEFAULT_FEATURE_LIMIT;
        this.fields.skip = fields.page * this.fields.limit || DEFAULT_FEATURE_SKIP;
    }

    save() {
        //this.fields = [{data: {x: 0, y: 0, z: 0}, movementType: null}]
        return this.collection.insertMany(this.fields);
    }

    getStringMovementList() {
        return this.collection.distinct('movementType');
    }

    getData() {
        return this.collection.find({}).toArray();
    }

    getDataByMovementType() {
        return this.collection
            .find({ movementType: this.fields.movementType })
            .limit(this.fields.limit)
            .skip(this.fields.skip)
            .toArray();
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
                    x: { $slice: [ '$x', AGGREGATED_MOVEMENT_TYPE_LIMIT ] },
                    y: { $slice: [ '$y', AGGREGATED_MOVEMENT_TYPE_LIMIT ] },
                    z: { $slice: [ '$z', AGGREGATED_MOVEMENT_TYPE_LIMIT ] },
                }
            }
        ]).toArray();
    }

    getMean() {
        return this.collection.aggregate([
            { $limit: this.fields.limit },
            { $skip: this.fields.skip },
            {
                $match: {
                    movementType: this.fields.movementType
                }
            }, {
                $group: {
                    _id: null,
                    mean_x: { $avg: '$x' },
                    mean_y: { $avg: '$y' },
                    mean_z: { $avg: '$z' }
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]).next();
    }

    getVariance() {
        return this.collection.aggregate([
            { $limit: this.fields.limit },
            { $skip: this.fields.skip },
            {
                $match: {
                    movementType: this.fields.movementType
                }
            },
            {
                $group: {
                    _id: '$movementType',
                    x: { $push: '$x' },
                    y: { $push: '$y' },
                    z: { $push: '$z' }
                }
            },
            {
                $project: {
                    _id: 0,
                    var_x: { $pow: [ { $stdDevPop: "$x" }, 2 ] },
                    var_y: { $pow: [ { $stdDevPop: "$y" }, 2 ] },
                    var_z: { $pow: [ { $stdDevPop: "$z" }, 2 ] },
                }
            }
        ]).next();
    }

    getStandardDeviation() {
        return this.collection.aggregate([
            { $limit: this.fields.limit },
            { $skip: this.fields.skip },
            {
                $match: {
                    movementType: this.fields.movementType
                }
            },
            {
                $group: {
                    _id: '$movementType',
                    x: { $push: '$x' },
                    y: { $push: '$y' },
                    z: { $push: '$z' }
                }
            },
            {
                $project: {
                    _id: 0,
                    std_dev_x: { $stdDevPop: "$x" },
                    std_dev_y: { $stdDevPop: "$y" },
                    std_dev_z: { $stdDevPop: "$z" }
                }
            }
        ]).next();
    }
}

db.registerModel(TrainData);

module.exports = TrainData;
