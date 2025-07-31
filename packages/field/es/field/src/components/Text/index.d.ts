import { PropType } from 'vue';
import { VueNode } from 'ant-design-vue/es/_util/type';
import { ProFieldFC } from '../../typing';
export declare const fieldTextProps: () => {
    mode: {
        type: PropType<ProFieldFC["mode"]>;
        default: undefined;
    };
    text: {
        type: PropType<string>;
        default: undefined;
    };
    emptyText: {
        type: PropType<VueNode>;
        default: string;
    };
    fieldProps: {
        type: PropType<ProFieldFC["fieldProps"]>;
        default: undefined;
    };
    customRender: {
        type: PropType<ProFieldFC["customRender"]>;
        default: undefined;
    };
    renderFormItem: {
        type: PropType<ProFieldFC["renderFormItem"]>;
        default: undefined;
    };
};
declare const FieldText: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    mode: {
        type: PropType<ProFieldFC["mode"]>;
        default: undefined;
    };
    text: {
        type: PropType<string>;
        default: undefined;
    };
    emptyText: {
        type: PropType<VueNode>;
        default: string;
    };
    fieldProps: {
        type: PropType<ProFieldFC["fieldProps"]>;
        default: undefined;
    };
    customRender: {
        type: PropType<ProFieldFC["customRender"]>;
        default: undefined;
    };
    renderFormItem: {
        type: PropType<ProFieldFC["renderFormItem"]>;
        default: undefined;
    };
}>, () => VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    mode: {
        type: PropType<ProFieldFC["mode"]>;
        default: undefined;
    };
    text: {
        type: PropType<string>;
        default: undefined;
    };
    emptyText: {
        type: PropType<VueNode>;
        default: string;
    };
    fieldProps: {
        type: PropType<ProFieldFC["fieldProps"]>;
        default: undefined;
    };
    customRender: {
        type: PropType<ProFieldFC["customRender"]>;
        default: undefined;
    };
    renderFormItem: {
        type: PropType<ProFieldFC["renderFormItem"]>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    mode: import('@ant-design-vue/pro-provider').ProFieldFCMode;
    text: string;
    fieldProps: any;
    customRender: ((text: any, props: Omit<import('@ant-design-vue/pro-provider').ProFieldFCRenderProps, "value" | "onChange">, dom: VueNode) => VueNode) | undefined;
    renderFormItem: ((text: any, props: import('@ant-design-vue/pro-provider').ProFieldFCRenderProps, dom: VueNode) => VueNode) | undefined;
    emptyText: VueNode;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default FieldText;
