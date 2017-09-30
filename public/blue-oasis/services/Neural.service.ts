import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import ITrainData from '../models/ITrainData';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
class NeuralService {

    public constructor(private __http: HttpClient) {}

    public sendTrainData(trainData: ITrainData[]): Observable<Object> {
        return this.__http.post(environment.apiProtectedUrl + '/neural/data', trainData);
    }

    public normalizeData(): Observable<Object> {
        return this.__http.get(environment.apiProtectedUrl + '/neural/normalize');
    }

    public train(type: string): Observable<Object> {
        return this.__http.post(environment.apiProtectedUrl + '/neural/train', { type });
    }
}

export default NeuralService;
