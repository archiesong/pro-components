import { FunctionalComponent } from 'vue';
import { RenderSetting } from '../../defaultSettings';
import { MessageDescriptor } from '../../typing';
declare const RegionalSetting: FunctionalComponent<{
    settings: Partial<RenderSetting>;
    changeSetting: (key: string, value: any, hideLoading?: boolean) => void;
    hashId: string;
    prefixCls: string;
    formatMessage: (data: MessageDescriptor) => string;
}>;
export default RegionalSetting;
