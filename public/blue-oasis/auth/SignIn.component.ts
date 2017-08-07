import { Component } from '@angular/core';
import { Router } from '@angular/router';
import IUser from '../models/IUser';
import User from '../models/User';
import AuthService from '../services/Auth.service';
import IServerError from '../models/IServerError';
import ErrorCodeList from '../config/ErrorCodeList';
import LocalStorage from '../helpers/LocalStorage';


@Component({
    selector: 'cmp-signin',
    templateUrl: 'blue-oasis/auth/signin.component.html'
})
class SignInComponent {

    public user: IUser;
    private __router: Router;
    private __authService: AuthService;

    public constructor(router: Router, authService: AuthService) {
        this.user = new User('Yevgeniy', 'qwerty');
        this.__router = router;
        this.__authService = authService;
    }

    public submit(): void {
        this.__authService.signIn(this.user)
            .then(this._submitHandler)
            .catch(this._submitCatch);
    }

    protected _submitHandler = (result: any): void => {
        LocalStorage.setItem('token', result.token);
        this.__router.navigate(['/admin/training']);
    };

    protected _submitCatch = (error: any): void => {
        let errorCode = (<IServerError>error.text()).errorCode;

        switch (errorCode) {
            case ErrorCodeList.USER_NOT_FOUND: {
                break;
            }
            case ErrorCodeList.INCORRECT_PASSWORD: {
                break;
            }
        }
    }
}

export default SignInComponent;
