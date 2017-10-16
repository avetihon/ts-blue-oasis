import ITrainData from './ITrainData';
import IDeviceAcceleration from './IDeviceAcceleration';

class TrainData implements ITrainData {
    public data: IDeviceAcceleration;
    public movementType: string;
    public timeStamp: number;

    public constructor(data: IDeviceAcceleration, movementType: string, timeStamp: number) {
        this.data = data;
        this.movementType = movementType;
        this.timeStamp = timeStamp;
    }
}

export default TrainData;
