import SettingService from './Setting.service';

const settingFactory = (settingService: SettingService): Function => {
    return () => settingService.load();
};

export default settingFactory;
