import { Component } from '@angular/core';
import IAcceleration from '../models/IAcceleration';

@Component({
    selector: 'cmp-recognition',
    templateUrl: 'blue-oasis/recognition/recognition.component.html'
})
class RecognitionComponent {
    private __data: IAcceleration[];
    public constructor() {
        this.__data = [];
    }

    public recognize(): void {
        console.log('You are my hero');
        window.addEventListener('devicemotion', this.__handleMotion, true);
        setTimeout(() => {
            window.removeEventListener('devicemotion', this.__handleMotion, true);
            console.log(this.__data);
        }, 5000);
    }

    private __handleMotion = (event: DeviceMotionEvent) => {

        // console.log(event.acceleration);
        this.__data.push(event.acceleration);
    }
}

export default RecognitionComponent;
