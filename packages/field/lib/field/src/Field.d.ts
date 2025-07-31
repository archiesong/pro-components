import { DefineComponent, PropType, Plugin, ExtractPropTypes } from 'vue';
import { ProFieldRequestData, ProFieldTextType, ProFieldValueObjectType, ProFieldValueType } from '@ant-design-vue/pro-utils';
import { ProFieldFCRenderProps, ProRenderFieldPropsType } from '@ant-design-vue/pro-provider';
import { VueNode } from 'ant-design-vue/lib/_util/type';
type RenderProps = Omit<ProFieldFCRenderProps, 'text' | 'placeholder'> & ProRenderFieldPropsType & {
    /** 从服务器读取选项 */
    request?: ProFieldRequestData;
    emptyText?: VueNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /**
     * @deprecated use onOpenChange replace
     */
    onVisible?: (visible: boolean) => void;
    /**
     * @deprecated use open replace
     */
    visible?: boolean;
    [key: string]: any;
};
export declare const proFieldProps: () => {
    text: {
        type: PropType<ProFieldTextType>;
        default: undefined;
    };
    valueType: {
        type: PropType<ProFieldValueType | ProFieldValueObjectType>;
        default: undefined;
    };
    mode: {
        type: PropType<RenderProps["mode"]>;
        default: undefined;
    };
    onChange: {
        type: PropType<RenderProps["onChange"]>;
        default: undefined;
    };
    renderFormItem: {
        type: PropType<RenderProps["renderFormItem"]>;
        default: undefined;
    };
    value: {
        type: PropType<RenderProps["value"]>;
        default: undefined;
    };
    readonly: {
        type: PropType<RenderProps["readonly"]>;
        default: undefined;
    };
    fieldProps: {
        type: PropType<RenderProps["fieldProps"]>;
        default: undefined;
    };
    placeholder: {
        type: PropType<string>;
        default: undefined;
    };
    valueEnum: {
        type: PropType<RenderProps["valueEnum"]>;
        default: undefined;
    };
};
export type ProFieldProps = Partial<ExtractPropTypes<ReturnType<typeof proFieldProps>>>;
declare const _default: DefineComponent<ProFieldProps> & Plugin;
export default _default;
