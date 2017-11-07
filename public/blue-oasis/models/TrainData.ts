import ITrainData from './ITrainData';

class TrainData implements ITrainData {
    public x: number;
    public y: number;
    public z: number;
    public movementType: string;
    public timeStamp: number;

    public constructor(x: number,
                       y: number,
                       z: number,
                       movementType: string,
                       timeStamp: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.movementType = movementType;
        this.timeStamp = timeStamp;
    }
}

export default TrainData;
