const brain = require('brain.js');
const TrainData = require('../models/TrainData');
const NormalizedTrainData = require('../models/NormalizedTrainData');
const wrapResponse = require('../helpers/wrapResponse');

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

const _normalizeData = _ => {
    const trainData = new TrainData();
    let normalizedTrainData;
    let dataList;
    let maximumValues;
    let minimumValues;
    let normalizedData;

    return trainData.getAll()
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
        .then(_ => normalizedTrainData.save());
};

const _prepareDataToTrain = (dataList, movementType) => {
    let i;
    let len;
    let trainData = [];
    for (i = 0, len = dataList.length; i < len; i += 1) {
        trainData.push({
            input: dataList[i].data,
            output: {
                [movementType]: 1
            }
        });
    }

    return trainData;
};

const _train = _ => {

};

const saveData = (request) => {
    const trainData = new TrainData(request.body);
    trainData.save().then(_ => _normalizeData());
};

const trainClassifier = (request) => {
    const normalizeTrainData = new NormalizedTrainData(request.body);

    return normalizeTrainData.getByType()
        .then(dataList => {
            return _prepareDataToTrain(dataList, request.body.movementType);
        })
        .then(trainData => {
            const net = new brain.NeuralNetwork();
            net.train(trainData);
            return trainData;
        });


    // net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
    //     {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
    //     {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);
    //
    // const output = net.run({ r: 1, g: 0.4, b: 0 });
    // console.log(request.body);
    // console.log(output);

};

module.exports = {
    saveData: wrapResponse(saveData),
    trainClassifier: wrapResponse(trainClassifier),
};
