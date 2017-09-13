import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import ITrainData from '../../models/ITrainData';
import ITrainResponse from '../../models/ITrainResponse';
import MovementTypeList from '../../config/MovementTypeList';
import MotionCaptureService from '../../services/MotionCapture.service';
import ClassificationService from '../../services/Classification.service';

@Component({
    selector: 'cmp-training',
    templateUrl: './adminTraining.component.html',
})
class AdminTrainingComponent {

    public MovementTypeList: MovementTypeList;
    public movementType: keyof typeof MovementTypeList;

    public constructor(private __classificationService: ClassificationService,
                       private __motionCaptureService: MotionCaptureService) {
        this.MovementTypeList = MovementTypeList;
    }

    public setMovementType(type: keyof typeof MovementTypeList): void {
        this.movementType = type;
    }

    public captureMovement(): void {
        if (this.movementType !== void 0) {
            this.__motionCaptureService.setMovementType(this.movementType);
            this.__motionCaptureService.capture();
        }
    }

    public stop(): void {
        this.__motionCaptureService.stopCapture();
    }

    public removeData(): void {
        this.__motionCaptureService.removeData();
    }

    public send(): void {
        const trainData: ITrainData[] = this.__motionCaptureService.getData();
        this.__classificationService
            .sendTrainData(trainData)
            .subscribe(this._sendNextHandler, this._sendErrorHandler);
    }

    protected _sendNextHandler = (response: ITrainResponse): void => {
        console.log(response);
    }

    protected _sendErrorHandler = (error: HttpErrorResponse): void => {

    }
}

export default AdminTrainingComponent;
