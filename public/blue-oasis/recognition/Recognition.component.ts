import { Component } from '@angular/core';
import RecognitionStateList from '../config/RecognitionStateList';
import { animate, state, style, transition, trigger } from '@angular/animations';

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

    public static readonly DEFAULT_MOVEMENT: string = 'not defined';

    public RecognitionStateList: RecognitionStateList;
    public currentState: number;
    public currentMovement: string;
    public showHint: boolean;

    public constructor() {
        this.RecognitionStateList = RecognitionStateList;
        this.currentState = RecognitionStateList.NOT_ACTIVE;
        this.currentMovement = RecognitionComponent.DEFAULT_MOVEMENT;
        this.showHint = true;
    }

    public recognize(): void {
        this.currentState = RecognitionStateList.CAPTURING;
    }

    public stop(): void {
        this.currentState = RecognitionStateList.NOT_ACTIVE;
    }

    public showHintText(): boolean {
        return (this.showHint && this.currentState === RecognitionStateList.NOT_ACTIVE);
    }
}

export default RecognitionComponent;
