import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import ITrainData from '../models/ITrainData';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
class ClassificationService {

    public constructor(private __http: HttpClient) {}

    public sendTrainData(trainData: ITrainData[]): Observable<Object> {
        return this.__http.post(environment.apiProtectedUrl + '/classification/data', trainData);
    }
}

export default ClassificationService;
