import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import IUser from '../models/IUser';
import ISuccessResponse from '../models/ISuccessResponse';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import IDictionary from '../models/IDictionary';

@Injectable()
class UserService {

    private __http: HttpClient;
    private __user: IUser;

    public constructor(http: HttpClient) {
        this.__http = http;
        this.__user = null;
    }

    public setUser(user: IUser | null): void {
        this.__user = user;
    }

    public getUser(): Observable<object> {
        if (this.__user === null) {
            return this.__http.get(environment.apiProtectedUrl + '/user')
                .map((response: ISuccessResponse<IUser>) => {
                    this.__user = response.data;

                    return this.__user;
                });
        }

        return Observable.of(this.__user);
    }

    public isLoggedIn(): Observable<boolean> {
        return this.getUser().map((user: IUser) => {
            return !!user;
        });
    }
}
export default UserService;
