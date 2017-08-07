import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { parseData, handleError } from '../helpers/HTTPHelpers';
import { environment } from "../environments/environment";
import IUser from '../models/IUser';

import 'rxjs/add/operator/toPromise';

@Injectable()
class AuthService {

    private __http: Http;

    public constructor(http: Http) {
        this.__http = http;
    }

    public signIn(user: IUser): any {
        return this.__http.post(environment.apiProtectedUrl + '/auth/signIn', user)
            .toPromise()
            .then(parseData)
            .catch(handleError);
    }
}

export default AuthService;
