import {Http, XHRBackend, RequestOptions } from '@angular/http';
import HttpInterceptorService from '../services/HttpInterceptor.service';

export function httpInterceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new HttpInterceptorService(xhrBackend, requestOptions);
}
