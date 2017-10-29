import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import ITrainData from '../models/ITrainData';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
class MLService {

    private __http: HttpClient;
    public constructor(http: HttpClient) {
        this.__http = http;
    }

    public sendTrainData(trainData: ITrainData[]): Observable<object> {
        return this.__http.post(environment.apiProtectedUrl + '/ml/data', trainData);
    }

    public train(movementType: string): Observable<object> {
        return this.__http.post(environment.apiProtectedUrl + '/ml/train', { movementType });
    }
}

export default MLService;
