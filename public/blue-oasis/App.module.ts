import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import AuthGuard from './services/AuthGuard.service';
import AdminModule from './admin/Admin.module';
import AppComponent from './App.component';
import AppRoutingModule from './AppRouting.module';
import AuthModule from './auth/Auth.module';
import AdminService from './services/User.service';
import AuthInterceptorService from './services/AuthInterceptor.service';
import ErrorInterceptorService from './services/ErrorInterceptor.service';
import ModeModule from './mode/Mode.module';
import ClassificationService from './services/Classification.service';
import MotionCaptureService from './services/MotionCapture.service';
import PageNotFoundComponent from './pageNotFound/PageNotFound.component';
import RecognitionModule from './recognition/Recognition.module';


@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ModeModule,
        RecognitionModule,
        AuthModule,
        AdminModule,
        AppRoutingModule
    ],
    providers: [AdminService, AuthGuard, ClassificationService, MotionCaptureService, {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true,
    }, {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptorService,
        multi: true,
    }],
})
class AppModule {}

export default AppModule;
