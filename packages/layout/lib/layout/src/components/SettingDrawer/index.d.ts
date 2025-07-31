import { ExtractPropTypes, PropType } from 'vue';
import { ProSettings } from '../../defaultSettings';
type MergerSettingsType<T> = Partial<T> & {
    colorPrimary?: string;
    colorWeak?: boolean;
    [key: string]: any;
};
export declare const settingDrawerProps: () => {
    settings: PropType<MergerSettingsType<ProSettings>>;
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
    collapsed: {
        type: BooleanConstructor;
        default: undefined;
    };
    colorList: {
        type: PropType<false | {
            key: string;
            color: string;
            title?: string;
        }[]>;
        default: undefined;
    };
    hideHintAlert: {
        type: BooleanConstructor;
        default: undefined;
    };
    hideCopyButton: {
        type: BooleanConstructor;
        default: undefined;
    };
    onSettingChange: {
        type: PropType<(config: MergerSettingsType<ProSettings>) => void>;
        default: undefined;
    };
    onCollapse: {
        type: PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
    'onUpdate:collapsed': {
        type: PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
};
export type SettingDrawerProps = Partial<ExtractPropTypes<ReturnType<typeof settingDrawerProps>>>;
/**
 * 可视化配置组件
 *
 * @param props
 */
declare const SettingDrawer: import('vue').DefineComponent<ExtractPropTypes<{
    settings: PropType<MergerSettingsType<ProSettings>>;
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
    collapsed: {
        type: BooleanConstructor;
        default: undefined;
    };
    colorList: {
        type: PropType<false | {
            key: string;
            color: string;
            title?: string;
        }[]>;
        default: undefined;
    };
    hideHintAlert: {
        type: BooleanConstructor;
        default: undefined;
    };
    hideCopyButton: {
        type: BooleanConstructor;
        default: undefined;
    };
    onSettingChange: {
        type: PropType<(config: MergerSettingsType<ProSettings>) => void>;
        default: undefined;
    };
    onCollapse: {
        type: PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
    'onUpdate:collapsed': {
        type: PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
}>, () => import('ant-design-vue/lib/_util/type').VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    settings: PropType<MergerSettingsType<ProSettings>>;
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
    collapsed: {
        type: BooleanConstructor;
        default: undefined;
    };
    colorList: {
        type: PropType<false | {
            key: string;
            color: string;
            title?: string;
        }[]>;
        default: undefined;
    };
    hideHintAlert: {
        type: BooleanConstructor;
        default: undefined;
    };
    hideCopyButton: {
        type: BooleanConstructor;
        default: undefined;
    };
    onSettingChange: {
        type: PropType<(config: MergerSettingsType<ProSettings>) => void>;
        default: undefined;
    };
    onCollapse: {
        type: PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
    'onUpdate:collapsed': {
        type: PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    prefixCls: string;
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
    'onUpdate:collapsed': (collapsed: boolean) => void;
    colorList: false | {
        key: string;
        color: string;
        title?: string;
    }[];
    hideHintAlert: boolean;
    hideCopyButton: boolean;
    onSettingChange: (config: MergerSettingsType<ProSettings>) => void;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default SettingDrawer;
