import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import RecognitionStateList from '../config/RecognitionStateList';
import RecognitionService from '../services/Recognition.service';

const runInOutAnimation = [
    state('in', style({transform: 'translateX(0)'})),
    transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate(250)
    ]),
    transition(':leave', [
        animate(250, style({transform: 'translateX(-100%)'}))
    ])
];

@Component({
    selector: 'cmp-recognition',
    templateUrl: './recognition.component.html',
    animations: [
        trigger('runInOut', runInOutAnimation)
    ],
})
class RecognitionComponent {

    public static readonly DEFAULT_MOVEMENT: string = 'Jumping';

    public RecognitionStateList: RecognitionStateList;
    public currentState: number;
    public currentMovement: string;
    public showHint: boolean;
    private __recognitionService: RecognitionService;

    public constructor(recognitionService: RecognitionService) {
        this.__recognitionService = recognitionService;
        this.RecognitionStateList = RecognitionStateList;
        this.currentState = RecognitionStateList.NOT_ACTIVE;
        this.currentMovement = RecognitionComponent.DEFAULT_MOVEMENT;
        this.showHint = true;
    }

    public recognize(): void {
        this.currentState = RecognitionStateList.CAPTURING;
        this.__recognitionService.recognition().subscribe();
    }

    public stop(): void {
        this.currentState = RecognitionStateList.NOT_ACTIVE;
    }

    public showHintText(): boolean {
        return (this.showHint && this.currentState === RecognitionStateList.NOT_ACTIVE);
    }
}

export default RecognitionComponent;
