import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import LocalStorage from '../helpers/LocalStorage';

@Injectable()
class AuthInterceptorService implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = LocalStorage.getItem('token');

        if (token !== null) {
            const authRequest: HttpRequest<any> = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });

            return next.handle(authRequest);
        }

        return next.handle(req);
    }
}
export default AuthInterceptorService;
