import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
class RecognitionService {
    private __http: HttpClient;
    public constructor(http: HttpClient) {
        this.__http = http;
    }

    public recognition(): Observable<object> {
        return this.__http.get(environment.apiPublicUrl + '/recognition');
    }
}

export default RecognitionService;
