import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from '@angular/http';
import LocalStorage from '../helpers/LocalStorage';

@Injectable()
class HttpInterceptorService extends Http {

    public constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, this._updateHeaders(options));
    }

    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, body, this._updateHeaders(options));
    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, this._updateHeaders(options));
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, this._updateHeaders(options));
    }

    protected _updateHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
        const token = LocalStorage.getItem('token');

        if (!options) {
            options = new RequestOptions();
        }
        if (!options.headers) {
            options.headers = new Headers();
        }

        if (token !== null) {
            options.headers.set('Authorization', `Bearer ${token}`);
        }

        options.headers.set('Content-Type', 'application/json');

        return options;
    }

}
export default HttpInterceptorService;
