import { Injectable } from '@angular/core';
import ISetting from '../models/ISetting';
import LocalStorage from '../helpers/LocalStorage';
import DefaultSettingList from '../config/DefaultSettingList';

@Injectable()
class SettingService {

    private __settings: ISetting;

    public get settings() {
        return this.__settings;
    }

    public load(): Promise<void> {
        this.__settings = JSON.parse(LocalStorage.getItem('settings'));

        if (this.__settings === null) {
            this.__settings = {
                theme: DefaultSettingList.THEME,
            };
        }

        return Promise.resolve();
    }
}

export default SettingService;
