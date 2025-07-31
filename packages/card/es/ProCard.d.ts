import { ExtractPropTypes, DefineComponent, Plugin } from 'vue';
export declare const proCardProps: () => {
    prefixCls: StringConstructor;
    title: import('vue-types').VueTypeValidableDef<any>;
    extra: import('vue-types').VueTypeValidableDef<any>;
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    bodyStyle: {
        type: import('vue').PropType<import('vue').CSSProperties>;
        default: import('vue').CSSProperties;
    };
    headStyle: {
        type: import('vue').PropType<import('vue').CSSProperties>;
        default: import('vue').CSSProperties;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    hoverable: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: import('vue').PropType<"inner">;
    };
    size: {
        type: import('vue').PropType<import('ant-design-vue/es/card/Card').CardSize>;
    };
    actions: import('vue-types').VueTypeValidableDef<any>;
    tabList: {
        type: import('vue').PropType<import('ant-design-vue/es/card/Card').CardTabListType[]>;
    };
    tabBarExtraContent: import('vue-types').VueTypeValidableDef<any>;
    activeTabKey: StringConstructor;
    defaultActiveTabKey: StringConstructor;
    cover: import('vue-types').VueTypeValidableDef<any>;
    onTabChange: {
        type: import('vue').PropType<(key: string) => void>;
    };
};
export type ProCardProps = Partial<ExtractPropTypes<ReturnType<typeof proCardProps>>>;
declare const _default: DefineComponent<ProCardProps> & Plugin;
export default _default;
