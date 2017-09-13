const TrainData = require('../models/trainData');
const ErrorCodeList = require('../config/errorCodeList');
const HTTPStatusCodes = require('../config/HTTPStatusCodes');

const saveData = (request, response) => {
    const trainData = new TrainData(request.body);
    const json = {
        success: true
    };
    trainData.save()
        .then(_ => response.status(HTTPStatusCodes.OK).json(json))
        .catch(error => {
            json.success = false;
            json.message = error.message;
            json.code = ErrorCodeList.UNEXPECTED_DATA_ERROR;
            return response
                .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
                .json(json);
    });
};

const trainModel = (request, response) => {
    console.log(request.body);
    response.status(HTTPStatusCodes.OK).json({ success: true });
};

module.exports = {
    saveData,
    trainModel,
};
