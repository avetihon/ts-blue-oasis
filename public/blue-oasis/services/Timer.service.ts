import { Injectable } from '@angular/core';

@Injectable()
class TimerService {

    private __requestAnimationId: number;
    public constructor() {}

    public start(callback: Function): void {
        let value: number;
        let previousValue: number;
        const then: number = performance.now();

        const timerLoop: FrameRequestCallback = (now: number) => {
            value = ~~((now - then) / 1000); // -> get seconds and round the number

            if (value !== previousValue) {
                previousValue = value;
                callback(value);
            }

            this.__requestAnimationId = requestAnimationFrame(timerLoop);
        };

        requestAnimationFrame(timerLoop);
    }

    public stop(): void {
        cancelAnimationFrame(this.__requestAnimationId);
    }
}

export default TimerService;
