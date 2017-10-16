import IDeviceAcceleration from './IDeviceAcceleration';

interface ITrainData {
    data: IDeviceAcceleration;
    movementType: string;
    timeStamp: number;
}

export default ITrainData;
