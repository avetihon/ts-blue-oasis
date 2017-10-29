import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import MLService from './services/ML.service';
import MotionCaptureService from './services/MotionCapture.service';
import ThemeSelectorComponent from './themeSelector/ThemeSelector.component';
import PageNotFoundComponent from './pageNotFound/PageNotFound.component';
import RecognitionModule from './recognition/Recognition.module';
import TimerService from './services/Timer.service';
import SharedComponentsModule from './shared/SharedComponents.module';
import SettingService from './services/Setting.service';
import ThemeService from './services/Theme.service';
import settingFactory from './services/Setting.factory';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        ThemeSelectorComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SharedComponentsModule,
        ModeModule,
        RecognitionModule,
        AuthModule,
        AdminModule,
        AppRoutingModule
    ],
    providers: [
        UserService,
        AuthGuard,
        MLService,
        MotionCaptureService,
        TimerService,
        SettingService,
        ThemeService, {
            provide: APP_INITIALIZER,
            useFactory: settingFactory,
            deps: [SettingService],
            multi: true,
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptorService,
            multi: true,
        }],
})
class AppModule {
}

export default AppModule;
