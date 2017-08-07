import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { parseData, handleError } from '../helpers/HTTPHelpers';
import { environment } from "../environments/environment";

import 'rxjs/add/operator/toPromise';
import IAcceleration from "../models/IAcceleration";

@Injectable()
class AdminService {

    private __http: Http;

    public constructor(http: Http) {
        this.__http = http;
    }

    public sendTrainSet(trainSet: any): any {
        return this.__http.post(environment.apiProtectedUrl + '/train', trainSet)
            .toPromise()
            .then(parseData)
            .catch(handleError);
    }
}
export default AdminService;
