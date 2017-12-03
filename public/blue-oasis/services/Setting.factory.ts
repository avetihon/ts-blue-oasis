import SettingService from './Setting.service';
import IFunction from '../models/IFunction';

const settingFactory = (settingService: SettingService): IFunction<Promise<void>> => {
    return () => settingService.load();
};

export default settingFactory;
