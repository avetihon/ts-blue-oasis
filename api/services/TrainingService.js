const TrainData = require('../models/TrainData');
const FeatureService = require('../services/FeatureService');

class TrainingService {
    constructor() {}

    createTreeWithTrainingData() {
        const trainData = new TrainData();

        return trainData.getStringMovementList()
            .then(movementList => {
                let i;
                let len;
                let featureService;
                for (i = 0, len = movementList.length; i < len; i += 1) {
                    featureService = new FeatureService(movementList[i]);
                    featureService.computeFeatures();
                    break;
                }
            });
    }
}

module.exports = TrainingService;
