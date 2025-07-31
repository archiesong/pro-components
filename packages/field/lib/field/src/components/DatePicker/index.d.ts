import { PropType } from 'vue';
import { ProFieldFC } from '../../typing';
declare const FieldDatePicker: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    mode: {
        type: PropType<ProFieldFC["mode"]>;
        default: undefined;
    };
    text: {
        type: PropType<ProFieldFC["text"]>;
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
    fieldProps: {
        type: PropType<ProFieldFC["fieldProps"]>;
        default: undefined;
    };
    format: {
        type: PropType<string>;
        default: undefined;
    };
    light: {
        type: PropType<ProFieldFC["light"]>;
        default: undefined;
    };
    picker: {
        type: PropType<"time" | "date" | "week" | "month" | "quarter" | "year">;
        default: undefined;
    };
    showTime: {
        type: PropType<boolean>;
        default: undefined;
    };
    plain: {
        type: PropType<ProFieldFC["plain"]>;
        default: undefined;
    };
}>, () => import('ant-design-vue/lib/_util/type').VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    mode: {
        type: PropType<ProFieldFC["mode"]>;
        default: undefined;
    };
    text: {
        type: PropType<ProFieldFC["text"]>;
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
    fieldProps: {
        type: PropType<ProFieldFC["fieldProps"]>;
        default: undefined;
    };
    format: {
        type: PropType<string>;
        default: undefined;
    };
    light: {
        type: PropType<ProFieldFC["light"]>;
        default: undefined;
    };
    picker: {
        type: PropType<"time" | "date" | "week" | "month" | "quarter" | "year">;
        default: undefined;
    };
    showTime: {
        type: PropType<boolean>;
        default: undefined;
    };
    plain: {
        type: PropType<ProFieldFC["plain"]>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    mode: import('@ant-design-vue/pro-provider').ProFieldFCMode;
    text: import('ant-design-vue/lib/_util/type').VueNode;
    fieldProps: any;
    plain: boolean | undefined;
    light: boolean | undefined;
    picker: "time" | "date" | "week" | "month" | "quarter" | "year";
    format: string;
    showTime: boolean;
    customRender: ((text: any, props: Omit<import('@ant-design-vue/pro-provider').ProFieldFCRenderProps, "value" | "onChange">, dom: import('ant-design-vue/lib/_util/type').VueNode) => import('ant-design-vue/lib/_util/type').VueNode) | undefined;
    renderFormItem: ((text: any, props: import('@ant-design-vue/pro-provider').ProFieldFCRenderProps, dom: import('ant-design-vue/lib/_util/type').VueNode) => import('ant-design-vue/lib/_util/type').VueNode) | undefined;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default FieldDatePicker;
