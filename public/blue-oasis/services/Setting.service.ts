import { Injectable } from '@angular/core';
import ISetting from '../models/ISetting';
import LocalStorage from '../helpers/LocalStorage';
import DefaultSettingList from '../config/DefaultSettingList';

@Injectable()
class SettingService {

    private __settings: ISetting;
    private __settingPropertyList: string[];

    public constructor() {
        this.__settingPropertyList = ['theme'];
    }

    public get settings() {
        return this.__settings;
    }

    public updateSettings(property: string, value: any): void {
        if (this.__settingPropertyList.indexOf(property) > -1) {
            (this.__settings as any)[property] = value;

            LocalStorage.setItem('settings', JSON.stringify(this.__settings));
        }
    }

    public load(): Promise<void> {
        this.__settings = JSON.parse(LocalStorage.getItem('settings'));

        if (this.__settings === null) {
            this.__settings = {
                theme: DefaultSettingList.THEME,
            };

            LocalStorage.setItem('settings', JSON.stringify(this.__settings));
        }

        return Promise.resolve();
    }
}

export default SettingService;
