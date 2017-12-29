import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import TrainData from '../models/TrainData';
import ITrainData from '../models/ITrainData';
import 'rxjs/add/observable/fromEvent';

@Injectable()
class MotionCaptureService {

    public motionData: ITrainData[];
    public movementType: string;
    private __subscribe: Subscription;

    public constructor() {
        this.motionData = [];
    }

    public capture(): void {
        this.__subscribe = Observable
            .fromEvent(window, 'devicemotion')
            .subscribe((event: DeviceMotionEvent): void => {
                this.motionData.push(new TrainData(
                    event.acceleration.x,
                    event.acceleration.y,
                    event.acceleration.z,
                    this.movementType,
                    event.timeStamp));
            });
    }

    public setMovementType(movementType: string): void {
        this.movementType = movementType;
    }

    public stopCapture(): void {
        if (this.__subscribe !== void 0) {
            this.__subscribe.unsubscribe();
        }
    }

    public getData(): ITrainData[] {
        return this.motionData;
    }

    public removeData(): void {
        this.motionData.length = 0;
    }
}
export default MotionCaptureService;
