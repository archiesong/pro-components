import { PropType } from 'vue';
import { FormProps } from 'ant-design-vue/lib/form';
import { ActionsProps } from './Actions';
export type BaseQueryFilterProps = Omit<ActionsProps, 'submitter' | 'setCollapsed' | 'isForm'> & {
    /**
     * @name layout 的布局设置
     * @type 'horizontal' | 'inline' | 'vertical';
     */
    layout?: FormProps['layout'];
};
export type QueryFilterProps<T = Record<string, any>> = Omit<FormProps, 'onFinish'> & BaseQueryFilterProps & {
    onReset?: (values: T) => void;
};
declare const QueryFilter: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
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
export default QueryFilter;
