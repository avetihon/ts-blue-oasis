import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import AuthService from './Auth.service';
import UserService from '../services/User.service';
import ErrorCodeList from '../config/ErrorCodeList';
import LocalStorage from '../helpers/LocalStorage';
import IUser from '../models/IUser';
import User from '../models/User';
import IAuthResponse from '../models/IAuthResponse';

@Component({
    selector: 'cmp-signin',
    templateUrl: './signin.component.html',
})
class SignInComponent {

    public user: IUser;
    private __router: Router;
    private __authService: AuthService;
    private __userService: UserService;

    public constructor(router: Router, authService: AuthService, userService: UserService) {
        this.user = new User('Yevgeniy', 'qwerty');
        this.__router = router;
        this.__authService = authService;
        this.__userService = userService;
    }

    public submit(): void {
        this.__authService.signIn(this.user).subscribe(this._submitHandler, this._submitCatch);
    }

    protected _submitHandler = (response: IAuthResponse): void => {
        LocalStorage.setItem('token', response.data.token);
        this.__userService.setUser(response.data.user);
        this.__router.navigate(['/admin/training']);
    }

    protected _submitCatch = (err: HttpErrorResponse): void => {
        const errorCode = err.error.code;

        switch (errorCode) {
            case ErrorCodeList.USER_NOT_FOUND: {
                break;
            }
            case ErrorCodeList.INCORRECT_PASSWORD: {
                break;
            }
            default: {

            }
        }
    }
}

export default SignInComponent;
