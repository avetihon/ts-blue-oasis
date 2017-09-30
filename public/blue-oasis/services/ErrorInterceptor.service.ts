import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import UserService from './User.service';
import LocalStorage from '../helpers/LocalStorage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
class ErrorInterceptorService implements HttpInterceptor {

    public constructor(private __router: Router, private __injector: Injector) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req).catch((error: HttpErrorResponse): any => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 403) {
                    const adminService = this.__injector.get(UserService);

                    // remove just in case
                    LocalStorage.removeItem('token');

                    // remove saved user
                    adminService.setUser(null);

                    // redirect to signin page
                    this.__router.navigate(['/signin']);
                }
            }

            return Observable.throw(error);
        });
    }
}
export default ErrorInterceptorService;
