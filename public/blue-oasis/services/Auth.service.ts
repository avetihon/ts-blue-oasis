import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import IUser from '../models/IUser';
import UserService from './User.service';
import { environment } from '../environments/environment';

@Injectable()
class AuthService {

    private __http: HttpClient;
    private __adminService: UserService;

    public constructor(http: HttpClient, adminService: UserService) {
        this.__http = http;
        this.__adminService = adminService;
    }

    public signIn(user: IUser): Observable<Object> {
        return this.__http.post(environment.apiProtectedUrl + '/auth/sign-in', user);
    }
}

export default AuthService;
