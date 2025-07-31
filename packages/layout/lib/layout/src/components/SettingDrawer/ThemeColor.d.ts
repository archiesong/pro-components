import { FunctionalComponent } from 'vue';
export type TagProps = {
    color: string;
    check: boolean;
    class?: string;
    onClick?: () => void;
};
export type ThemeColorProps = {
    colorList?: {
        key: string;
        color: string;
        title?: string;
    }[];
    prefixCls: string;
    value: string;
    onChange: (color: string) => void;
    formatMessage: (data: {
        id: string;
        defaultMessage?: string;
    }) => string;
    hashId: string;
};
declare const ThemeColor: FunctionalComponent<ThemeColorProps>;
export default ThemeColor;
