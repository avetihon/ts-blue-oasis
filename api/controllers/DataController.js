const TrainData = require('../models/TrainData');
const wrapResponse = require('../helpers/wrapResponse');

const saveData = (request) => {
    const trainData = new TrainData(request.body);
    return trainData.save();
};

const getDataListByMovementType = () => {
    return new TrainData().aggregatedByMovementType();
};


module.exports = {
    saveData: wrapResponse(saveData),
    getDataListByMovementType: wrapResponse(getDataListByMovementType)
};
