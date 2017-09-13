import ITrainData from './ITrainData';
import IDeviceAcceleration from './IDeviceAcceleration';

class TrainData implements ITrainData {
    public data: IDeviceAcceleration;
    public movementType: string;

    public constructor(data: IDeviceAcceleration, movementType: string) {
        this.data = data;
        this.movementType = movementType;
    }
}

export default TrainData;
