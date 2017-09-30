import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import ITrainData from '../../models/ITrainData';
import ITrainResponse from '../../models/ITrainResponse';
import MovementTypeList from '../../config/MovementTypeList';
import MotionCaptureService from '../../services/MotionCapture.service';
import NeuralService from '../../services/Neural.service';
import TimerService from '../../services/Timer.service';

@Component({
    selector: 'cmp-training',
    templateUrl: './adminTraining.component.html',
})
class AdminTrainingComponent {

    public ticks: number;
    public MovementTypeList: MovementTypeList;
    public movementType: keyof typeof MovementTypeList;

    public constructor(private __neuralService: NeuralService,
                       private __motionCaptureService: MotionCaptureService,
                       private __timerService: TimerService) {
        this.MovementTypeList = MovementTypeList;
    }

    public setMovementType(type: keyof typeof MovementTypeList): void {
        this.movementType = type;
    }

    public captureMovement(): void {
        if (this.movementType !== void 0) {
            this.__timerService.start((ticks: number) => {
                this.ticks = ticks;
            });

            this.__motionCaptureService.setMovementType(this.movementType);
            this.__motionCaptureService.capture();
        }
    }

    public stop(): void {
        this.__timerService.stop();
        this.__motionCaptureService.stopCapture();
    }

    public removeData(): void {
        this.__motionCaptureService.removeData();
    }

    public send(): void {
        const trainData: ITrainData[] = this.__motionCaptureService.getData();
        this.__neuralService
            .sendTrainData(trainData)
            .subscribe(this._sendNextHandler, this._sendErrorHandler);
    }

    protected _sendNextHandler = (response: ITrainResponse): void => {
        console.log(response);
    }

    protected _sendErrorHandler = (error: HttpErrorResponse): void => {

    }

    public normalizeData(): void {
        this.__neuralService
            .normalizeData()
            .subscribe(this._normalizeDataNextHandler, this._normalizeDataErrorHandler)
    }

    protected _normalizeDataNextHandler = (response: ITrainResponse): void => {
        console.log(response);
    }

    protected _normalizeDataErrorHandler = (error: HttpErrorResponse): void => {

    }

    public train(): void {
        if (this.movementType !== void 0) {
            this.__neuralService
                .train(this.movementType)
                .subscribe(this._trainNextHandler, this._trainErrorHandler);
        }
    }

    protected _trainNextHandler = (response: ITrainResponse): void => {
        console.log(response);
    }

    protected _trainErrorHandler = (error: HttpErrorResponse): void => {

    }
}

export default AdminTrainingComponent;
