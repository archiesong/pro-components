import { PropType, ExtractPropTypes } from 'vue';
import { ProFieldFC } from '../../typing';
import { ProFieldValueEnumType, RequestOptionsType } from '@ant-design-vue/pro-utils';
type SelectOptionType = Partial<RequestOptionsType>[];
/**
 * 把 value 的枚举转化为数组
 *
 * @param valueEnum
 */
export declare const proFieldParsingValueEnumToArray: (valueEnumParams: ProFieldValueEnumType) => SelectOptionType;
export declare const fieldSelectProps: () => {
    mode: {
        type: PropType<ProFieldFC["mode"]>;
        default: undefined;
    };
    text: {
        type: PropType<string>;
        default: undefined;
    };
    label: {
        type: PropType<ProFieldFC["label"]>;
        default: undefined;
    };
    /** 值的枚举，如果存在枚举，Search 中会生成 select */
    valueEnum: {
        type: PropType<ProFieldValueEnumType>;
        default: undefined;
    };
    fieldProps: {
        type: PropType<ProFieldFC["fieldProps"]>;
        default: undefined;
    };
    light: {
        type: PropType<ProFieldFC["light"]>;
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
export type FieldSelectProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSelectProps>>>;
declare const FieldSelect: import('vue').DefineComponent<ExtractPropTypes<{
    mode: {
        type: PropType<ProFieldFC["mode"]>;
        default: undefined;
    };
    text: {
        type: PropType<string>;
        default: undefined;
    };
    label: {
        type: PropType<ProFieldFC["label"]>;
        default: undefined;
    };
    /** 值的枚举，如果存在枚举，Search 中会生成 select */
    valueEnum: {
        type: PropType<ProFieldValueEnumType>;
        default: undefined;
    };
    fieldProps: {
        type: PropType<ProFieldFC["fieldProps"]>;
        default: undefined;
    };
    light: {
        type: PropType<ProFieldFC["light"]>;
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
}>, () => string | number | boolean | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> | (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> | null | undefined)[] | null, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    mode: {
        type: PropType<ProFieldFC["mode"]>;
        default: undefined;
    };
    text: {
        type: PropType<string>;
        default: undefined;
    };
    label: {
        type: PropType<ProFieldFC["label"]>;
        default: undefined;
    };
    /** 值的枚举，如果存在枚举，Search 中会生成 select */
    valueEnum: {
        type: PropType<ProFieldValueEnumType>;
        default: undefined;
    };
    fieldProps: {
        type: PropType<ProFieldFC["fieldProps"]>;
        default: undefined;
    };
    light: {
        type: PropType<ProFieldFC["light"]>;
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
    light: boolean | undefined;
    label: import('ant-design-vue/lib/_util/type').VueNode;
    valueEnum: ProFieldValueEnumType;
    customRender: ((text: any, props: Omit<import('@ant-design-vue/pro-provider').ProFieldFCRenderProps, "value" | "onChange">, dom: import('ant-design-vue/lib/_util/type').VueNode) => import('ant-design-vue/lib/_util/type').VueNode) | undefined;
    renderFormItem: ((text: any, props: import('@ant-design-vue/pro-provider').ProFieldFCRenderProps, dom: import('ant-design-vue/lib/_util/type').VueNode) => import('ant-design-vue/lib/_util/type').VueNode) | undefined;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default FieldSelect;
