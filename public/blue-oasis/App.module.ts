import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import AuthGuard from './services/AuthGuard.service';
import AdminModule from './admin/Admin.module';
import AppComponent from './App.component';
import AppRoutingModule from './AppRouting.module';
import AuthModule from './auth/Auth.module';
import UserService from './services/User.service';
import AuthInterceptorService from './services/AuthInterceptor.service';
import ErrorInterceptorService from './services/ErrorInterceptor.service';
import ModeModule from './mode/Mode.module';
import NeuralService from './services/Neural.service';
import MotionCaptureService from './services/MotionCapture.service';
import PageNotFoundComponent from './pageNotFound/PageNotFound.component';
import RecognitionModule from './recognition/Recognition.module';
import TimerService from './services/Timer.service';


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
    providers: [UserService, AuthGuard, NeuralService, MotionCaptureService, TimerService, {
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
