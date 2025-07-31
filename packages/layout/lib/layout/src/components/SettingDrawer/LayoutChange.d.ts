import { ComputedRef, FunctionalComponent } from 'vue';
import { PureSettings } from '../../defaultSettings';
import { Locale } from 'ant-design-vue/lib/locale';
import { MessageDescriptor, VueNode } from '../../typing';
export type SettingItemProps = {
    title: VueNode;
    action: VueNode;
    disabled?: boolean;
    disabledReason?: VueNode;
};
export declare const getFormatMessage: (locale?: ComputedRef<Locale>) => ((data: {
    id: string;
    defaultMessage?: string;
}) => string);
export declare const renderLayoutSettingItem: (item: SettingItemProps) => import("vue/jsx-runtime").JSX.Element;
export declare const LayoutSetting: FunctionalComponent<{
    settings: Partial<PureSettings>;
    changeSetting: (key: string, value: any) => void;
    hashId: string;
    prefixCls: string;
    formatMessage: (data: MessageDescriptor) => string;
}>;
