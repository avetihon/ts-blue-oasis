import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import MovementTypeList from '../../config/MovementTypeList';
import MotionCaptureService from '../../services/MotionCapture.service';
import MLService from '../../services/ML.service';
import DataService from '../../services/Data.service';
import TimerService from '../../services/Timer.service';
import TrainingStateList from '../../config/TrainingStateList';
import TrainingResponseList from '../../config/TrainingResponseList';
import IDictionary from '../../models/IDictionary';
import ISuccessResponse from '../../models/ISuccessResponse';
import ITrainData from '../../models/ITrainData';
import ThemeService from '../../services/Theme.service';

@Component({
    selector: 'cmp-training',
    templateUrl: './adminTraining.component.html',
})
class AdminTrainingComponent {

    public ticks: number;
    public MovementTypeList: MovementTypeList;
    public TrainingStateList: TrainingStateList;
    public TrainingResponseList: TrainingResponseList;
    public trainData: ITrainData[];
    public movementType: string;
    public trainingState: number;
    public defaultMovementType: string;
    public currentTheme: string;
    public response: IDictionary<string | number>;

    private __mlService: MLService;
    private __dataService: DataService;
    private __motionCaptureService: MotionCaptureService;
    private __timerService: TimerService;
    private __themeService: ThemeService;

    public constructor(mlService: MLService,
                       dataService: DataService,
                       motionCaptureService: MotionCaptureService,
                       timerService: TimerService,
                       themeService: ThemeService) {
        this.__mlService = mlService;
        this.__dataService = dataService;
        this.__motionCaptureService = motionCaptureService;
        this.__timerService = timerService;
        this.__themeService = themeService;

        this.MovementTypeList = MovementTypeList;
        this.TrainingStateList = TrainingStateList;
        this.TrainingResponseList = TrainingResponseList;
        this.defaultMovementType = MovementTypeList.NOT_SELECTED;
        this.trainingState = TrainingStateList.NOT_ACTIVE;
        this.ticks = 0;
        this.response = {};

        this.__themeService.getThemeObservable().subscribe((theme: string) => {
            this.currentTheme = theme;
        });
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
            this.response = {};
            this.trainingState = TrainingStateList.CAPTURING;
        }
    }

    public stop(): void {
        this.__timerService.stop();
        this.__motionCaptureService.stopCapture();
        this.trainData = this.__motionCaptureService.getData();
        this.trainingState = TrainingStateList.STOPPED;
    }

    public removeData(): void {
        this.ticks = 0;
        this.trainData = [];
        this.trainingState = TrainingStateList.NOT_ACTIVE;
        this.__motionCaptureService.removeData();
    }

    public send(): void {
        if (this.trainData.length > 0) {
            this.__dataService
                .sendTrainData(this.trainData)
                .subscribe((response: ISuccessResponse<IDictionary<any>>): void => {
                    this.trainingState = TrainingStateList.NOT_ACTIVE;
                    this.response = {
                        data: response.data.insertedCount,
                        type: TrainingResponseList.DATA,
                    };
                }, (error: HttpErrorResponse): void => {});
        }
    }

    public train(): void {
        this.__mlService
            .train()
            .subscribe((response: any): void => {
                console.log(response);
            }, (error: HttpErrorResponse): void => {});
    }

    public getPathToIcon(icon: string): string {
        return '../../../assets/images/training/movements/' + this.currentTheme + '-' + icon + '.svg';
    }
}

export default AdminTrainingComponent;
