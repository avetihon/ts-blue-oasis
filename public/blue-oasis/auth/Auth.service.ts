import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

import IUser from '../models/IUser';
import UserService from '../services/User.service';
import IAuthResponse from '../models/IAuthResponse';

@Injectable()
class AuthService {

    private __http: HttpClient;
    private __userService: UserService;

    public constructor(http: HttpClient, userService: UserService) {
        this.__http = http;
        this.__userService = userService;
    }

    public signIn(user: IUser): Observable<IAuthResponse> {
        return this.__http.post(environment.apiProtectedUrl + '/authorize', user);
    }
}

export default AuthService;
