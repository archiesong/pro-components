import { VNode, FunctionalComponent } from 'vue';
declare const BlockCheckbox: FunctionalComponent<{
    list?: {
        title: string;
        key: string;
        icon?: VNode;
    }[];
    prefixCls?: string;
    value?: string;
    hashId?: string;
    configType?: string;
    onChange?: (value: string) => void;
}>;
export default BlockCheckbox;
