import { PropType } from 'vue';
import { FormInstance } from 'ant-design-vue';
type ProFormInstance = FormInstance;
export type { FormInstance, ProFormInstance };
export declare const BaseForm: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    onInit: {
        type: PropType<(values: any, form: any) => void>;
        default: undefined;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    onInit: {
        type: PropType<(values: any, form: any) => void>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    onInit: (values: any, form: any) => void;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
