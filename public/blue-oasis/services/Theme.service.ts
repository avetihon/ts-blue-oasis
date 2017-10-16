import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import SettingService from './Setting.service';
import ThemeList from '../config/ThemeList';

@Injectable()
class ThemeService {

    private __themeSubject: BehaviorSubject<string>;
    private __settingService: SettingService;
    private __themeList: string[];

    public constructor(settingService: SettingService) {
        this.__settingService = settingService;
        this.__themeList = [ThemeList.PINK, ThemeList.BLUE];
        this.__themeSubject = new BehaviorSubject<string>(settingService.settings.theme);
    }

    public setNewTheme(): void {
        const currentTheme: string = this.__themeSubject.getValue();
        const index: number = this.__themeList.indexOf(currentTheme);
        let nextTheme: string = this.__themeList[index + 1];

        if (nextTheme === void 0) {
            nextTheme = this.__themeList[0];
        }

        this.__themeSubject.next(nextTheme);
    }

    public getThemeObservable(): Observable<string> {
        return this.__themeSubject.asObservable();
    }
}

export default ThemeService;
