const TrainData = require('./../models/TrainData');

const DEFAULT_FEATURE_LIMIT = 120;
const DEFAULT_PAGE = 0;

class FeatureService {

    constructor(movementType) {
        this.trainData = new TrainData({
            movementType: movementType,
            limit: DEFAULT_FEATURE_LIMIT,
            page: DEFAULT_PAGE,
        });
    }

    /**
    * The Feature contain
    * 1) the average acceleration (x, y, z)
    * 2) the variance (x, y, z)
    * 3) the standard deviation (x, y, z)
    * 4) the average absolute difference (x, y, z)
    * 5) the average resultant acceleration
    * 6) the average time between peaks
    * 7) the average difference between X and Y
    */
    computeFeatures() {
        let _dataList;
        let _mean;
        let featureList;
        let feature = [];
        this.trainData.getDataByMovementType().then(dataList => {
            _dataList = dataList;

            return this.__computeMean();
        }).then(mean => {
            _mean = mean;
            feature.push(mean.mean_x, mean.mean_y, mean.mean_z);

            return this.__computeVariance();
        }).then(variance => {
            feature.push(variance.var_x, variance.var_y, variance.var_z);

            return this.__computeStandardDeviation();
        }).then(deviation => {
            feature.push(deviation.std_dev_x, deviation.std_dev_y, deviation.std_dev_z);

            return this.__computeAverageAbsDifference(_dataList, _mean);
        }).then(averageAbsDifference => {
            feature.push(
                averageAbsDifference.avr_abs_x,
                averageAbsDifference.avr_abs_y,
                averageAbsDifference.avr_abs_z
            );
        });
    }

    setPage(page) {
        this.trainData.set('page', page);
    }

    /**
     * @return Promise object (mean_x, mean_y, mean_z)
     */
    __computeMean() {
        return this.trainData.getMean();
    }

    /**
     * @return Promise object (var_x, var_y, var_z)
     */
    __computeVariance() {
        return this.trainData.getVariance();
    }

    /**
     * @return Promise object (std_dev_x, std_dev_y, std_dev_z)
     */
    __computeStandardDeviation() {
        return this.trainData.getStandardDeviation();
    }

    /**
     * @return Object (avr_abs_x, avr_abs_y, avr_abs_z)
     *
     * where avr_abs_x: [ (1 / n ) * ∑ |x - mean_x| ]
     */
    __computeAverageAbsDifference(dataList, mean) {
        let i;
        let len;
        let data;

        // for each point x compute x - mean
        // then apply an absolute value: |x - mean|
        for (i = 0, len = dataList.length; i < len; i += 1) {
            data = dataList[i];
            data.x = Math.abs(data.x - mean.mean_x);
            data.y = Math.abs(data.y - mean.mean_y);
            data.z = Math.abs(data.z - mean.mean_z);
        }

        let averageAxisX = 0;
        let averageAxisY = 0;
        let averageAxisZ = 0;

        // apply for each axis (1 / n ) * ∑ |x - mean|
        for (i = 0; i < len; i += 1) {
            data = dataList[i];
            averageAxisX += data.x;
            averageAxisY += data.y;
            averageAxisZ += data.z;
        }

        averageAxisX /= len;
        averageAxisY /= len;
        averageAxisZ /= len;

        return {
            avr_abs_x: averageAxisX,
            avr_abs_y: averageAxisY,
            avr_abs_z: averageAxisZ,
        }
    }

    /**
     * @return Number 1/n * ∑ √(x² + y² + z²)
     */
    __computeResultantAcc(dataList) {
        // first let's compute the square of each value and the sum
        // compute then the root square: √(x² + y² + z²)
        // to finish apply a mean function: 1/n * sum [√(x² + y² + z²)]

        let i;
        let len;
        let data;

        for (i = 0, len = dataList.length; i < len; i += 1) {
            data = dataList[i];

            data.x = Math.pow(data.x, 2);
            data.y = Math.pow(data.y, 2);
            data.z = Math.pow(data.z, 2);

        }
    }
}

module.exports = FeatureService;
