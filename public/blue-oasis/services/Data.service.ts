import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import ITrainData from '../models/ITrainData';

@Injectable()
class DataService {

    private __http: HttpClient;

    public constructor(http: HttpClient) {
        this.__http = http;
    }

    public sendTrainData(trainData: ITrainData[]): Observable<object> {
        return this.__http.post(environment.apiProtectedUrl + '/data', trainData);
    }

    public getDataListByMovementType(): Observable<object> {
        return this.__http.get(environment.apiProtectedUrl + '/data/movement');
    }
}

export default DataService;
