import { PropType } from 'vue';
import { ProSchemaComponentTypes } from '@ant-design-vue/pro-utils';
declare const BetaSchemaForm: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    onInit: {
        type: PropType<(values: any, form: any) => void>;
        default: undefined;
    };
    layoutType: {
        type: PropType<"Form" | "QueryFilter" | "LightFilter">;
        default: undefined;
    };
    type: {
        type: PropType<ProSchemaComponentTypes>;
        default: undefined;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    onInit: {
        type: PropType<(values: any, form: any) => void>;
        default: undefined;
    };
    layoutType: {
        type: PropType<"Form" | "QueryFilter" | "LightFilter">;
        default: undefined;
    };
    type: {
        type: PropType<ProSchemaComponentTypes>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    type: ProSchemaComponentTypes;
    onInit: (values: any, form: any) => void;
    layoutType: "QueryFilter" | "Form" | "LightFilter";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default BetaSchemaForm;
