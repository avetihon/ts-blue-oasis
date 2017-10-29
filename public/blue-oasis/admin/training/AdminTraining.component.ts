import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import ITrainData from '../../models/ITrainData';
import ITrainResponse from '../../models/ITrainResponse';
import MovementTypeList from '../../config/MovementTypeList';
import MotionCaptureService from '../../services/MotionCapture.service';
import MLService from '../../services/ML.service';
import TimerService from '../../services/Timer.service';

const DEFAULT_MOVEMENT: string = 'Not selected';

@Component({
    selector: 'cmp-training',
    templateUrl: './adminTraining.component.html',
})
class AdminTrainingComponent {

    public ticks: number;
    public MovementTypeList: MovementTypeList;
    public movementType: string;
    public defaultMovementType: string;

    private __mlService: MLService;
    private __motionCaptureService: MotionCaptureService;
    private __timerService: TimerService;

    public constructor(mlService: MLService,
                       motionCaptureService: MotionCaptureService,
                       timerService: TimerService) {
        this.__mlService = mlService;
        this.__motionCaptureService = motionCaptureService;
        this.__timerService = timerService;
        this.defaultMovementType = DEFAULT_MOVEMENT;
        this.MovementTypeList = MovementTypeList;
    }

    public setMovementType(movementType: keyof typeof MovementTypeList): void {
        this.movementType = movementType;
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
        if (trainData.length > 0) {
            this.__mlService
                .sendTrainData(trainData)
                .subscribe((response: ITrainResponse): void => {
                    console.log(response);
                }, (error: HttpErrorResponse): void => {});
        }
    }

    public train(): void {
        if (this.movementType !== void 0) {
            this.__mlService
                .train(this.movementType)
                .subscribe((response: ITrainResponse): void => {
                    console.log(response);
                }, (error: HttpErrorResponse): void => {});
        }
    }
}

export default AdminTrainingComponent;
