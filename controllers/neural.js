const brain = require('brain.js');
const TrainData = require('../models/trainData');
const NormalizedTrainData = require('../models/normalizedTrainData');
const ErrorCodeList = require('../config/errorCodeList');
const HTTPStatusCodes = require('../config/HTTPStatusCodes');

const _train = _ => {

};

const _normalizeFormula = (value, maximum, minimum) => {
    return (value - minimum) / (maximum - minimum);
};

const _normalizeHelper = (trainDataList, maximumValues, minimumValues) => {
    let i;
    let len;
    let trainData;
    for (i = 0, len = trainDataList.length; i < len; i += 1) {
        trainData = trainDataList[i].data;
        trainData.x = _normalizeFormula(trainData.x, maximumValues.x, minimumValues.x);
        trainData.y = _normalizeFormula(trainData.y, maximumValues.y, minimumValues.y);
        trainData.z = _normalizeFormula(trainData.z, maximumValues.z, minimumValues.z);
    }

    return trainDataList;
};

const saveData = (request, response) => {
    const trainData = new TrainData(request.body);
    trainData.save()
        .then(_ => response.status(HTTPStatusCodes.OK).json({ success: true }))
        .catch(error => {
            const json = {
                success: false,
                message: error.message,
                code: ErrorCodeList.UNEXPECTED_DATA_ERROR
            };
            return response
                .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
                .json(json);
    });
};

const normalizeData = (request, response) => {
    const trainData = new TrainData();
    let normalizedTrainData;
    let dataList;
    let maximumValues;
    let minimumValues;
    let normalizedData;

    trainData.getAll()
        .then(data => {
            dataList = data;
            return trainData.getMaximum();
        })
        .then(data => {
            maximumValues = data[0];
            return trainData.getMinimum();
        })
        .then(data => {
            minimumValues = data[0];
            return normalizedData = _normalizeHelper(dataList, maximumValues, minimumValues);
        })
        .then(data => {
            normalizedTrainData = new NormalizedTrainData(data);
            return normalizedTrainData.remove();
        })
        .then(_ => normalizedTrainData.save())
        .then(_ => response.status(HTTPStatusCodes.OK).json({ success: true }))
        .catch(error => {
            const json = {
                success: false,
                message: error.message,
                code: ErrorCodeList.UNEXPECTED_DATA_ERROR
            };
            response
                .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
                .json(json);
        });
};

const trainNetwork = (request, response) => {
    const net = new brain.NeuralNetwork();

    net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
        {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
        {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);

    const output = net.run({ r: 1, g: 0.4, b: 0 });
    console.log(request.body);
    console.log(output);
    response.status(HTTPStatusCodes.OK).json({ success: true });
};

module.exports = {
    saveData,
    normalizeData,
    trainNetwork,
};
