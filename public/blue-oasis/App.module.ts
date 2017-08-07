import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import ModeModule from './mode/Mode.module';
import RecognitionModule from './recognition/Recognition.module';
import AuthModule from './auth/Auth.module';
import AdminModule from './admin/Admin.module';
import PageNotFoundComponent from './pageNotFound/PageNotFound.component';
import AppComponent from './App.component';
import AppRoutingModule from './AppRouting.module';
import { httpInterceptorFactory } from './factory/httpInterceptor.factory';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ModeModule,
        RecognitionModule,
        AuthModule,
        AdminModule,
        AppRoutingModule
    ],
    providers: [{
        provide: Http,
        useFactory: httpInterceptorFactory,
        deps: [XHRBackend, RequestOptions]
    }]
})
class AppModule {}

export default AppModule;
