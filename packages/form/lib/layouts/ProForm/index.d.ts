import { ExtractPropTypes, PropType } from 'vue';
export declare const proFormProps: () => {
    onInit: {
        type: PropType<(values: any, form: any) => void>;
        default: undefined;
    };
    layout: import('vue-types').VueTypeDef<string>;
    labelCol: {
        type: PropType<Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes>;
        default: Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes;
    };
    wrapperCol: {
        type: PropType<Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes>;
        default: Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes;
    };
    colon: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelAlign: {
        type: PropType<import('ant-design-vue/lib/form/interface').FormLabelAlign>;
        default: import('ant-design-vue/lib/form/interface').FormLabelAlign;
    };
    labelWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
    prefixCls: StringConstructor;
    requiredMark: {
        type: PropType<"" | import('ant-design-vue/lib/form/Form').RequiredMark>;
        default: "" | import('ant-design-vue/lib/form/Form').RequiredMark;
    };
    hideRequiredMark: {
        type: BooleanConstructor;
        default: boolean;
    };
    model: import('vue-types').VueTypeValidableDef<{
        [key: string]: any;
    }> & {
        default: () => {
            [key: string]: any;
        };
    };
    rules: {
        type: PropType<{
            [k: string]: import('ant-design-vue/lib/form').RuleObject | import('ant-design-vue/lib/form').RuleObject[];
        }>;
        default: {
            [k: string]: import('ant-design-vue/lib/form').RuleObject | import('ant-design-vue/lib/form').RuleObject[];
        };
    };
    validateMessages: {
        type: PropType<import('ant-design-vue/lib/form/interface').ValidateMessages>;
        default: import('ant-design-vue/lib/form/interface').ValidateMessages;
    };
    validateOnRuleChange: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollToFirstError: {
        default: boolean | import('scroll-into-view-if-needed').Options<any>;
        type: PropType<boolean | import('scroll-into-view-if-needed').Options<any>>;
    };
    onSubmit: {
        type: PropType<(e: Event) => void>;
        default: (e: Event) => void;
    };
    name: StringConstructor;
    validateTrigger: {
        type: PropType<string | string[]>;
        default: string | string[];
    };
    size: {
        type: PropType<import('ant-design-vue/lib/button').ButtonSize>;
        default: import('ant-design-vue/lib/button').ButtonSize;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    onValuesChange: {
        type: PropType<(changedValues: any, values: any) => void>;
        default: (changedValues: any, values: any) => void;
    };
    onFieldsChange: {
        type: PropType<(changedFields: import('ant-design-vue/lib/form/interface').FieldData[], allFields: import('ant-design-vue/lib/form/interface').FieldData[]) => void>;
        default: (changedFields: import('ant-design-vue/lib/form/interface').FieldData[], allFields: import('ant-design-vue/lib/form/interface').FieldData[]) => void;
    };
    onFinishFailed: {
        type: PropType<(errorInfo: import('ant-design-vue/lib/form/interface').ValidateErrorEntity<any>) => void>;
        default: (errorInfo: import('ant-design-vue/lib/form/interface').ValidateErrorEntity<any>) => void;
    };
    onValidate: {
        type: PropType<(name: string | number | string[] | number[], status: boolean, errors: string[]) => void>;
        default: (name: string | number | string[] | number[], status: boolean, errors: string[]) => void;
    };
};
export type ProFormProps = Partial<ExtractPropTypes<ReturnType<typeof proFormProps>>>;
declare const ProForm: import('vue').DefineComponent<ExtractPropTypes<{
    onInit: {
        type: PropType<(values: any, form: any) => void>;
        default: undefined;
    };
    layout: import('vue-types').VueTypeDef<string>;
    labelCol: {
        type: PropType<Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes>;
        default: Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes;
    };
    wrapperCol: {
        type: PropType<Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes>;
        default: Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes;
    };
    colon: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelAlign: {
        type: PropType<import('ant-design-vue/lib/form/interface').FormLabelAlign>;
        default: import('ant-design-vue/lib/form/interface').FormLabelAlign;
    };
    labelWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
    prefixCls: StringConstructor;
    requiredMark: {
        type: PropType<"" | import('ant-design-vue/lib/form/Form').RequiredMark>;
        default: "" | import('ant-design-vue/lib/form/Form').RequiredMark;
    };
    hideRequiredMark: {
        type: BooleanConstructor;
        default: boolean;
    };
    model: import('vue-types').VueTypeValidableDef<{
        [key: string]: any;
    }> & {
        default: () => {
            [key: string]: any;
        };
    };
    rules: {
        type: PropType<{
            [k: string]: import('ant-design-vue/lib/form').RuleObject | import('ant-design-vue/lib/form').RuleObject[];
        }>;
        default: {
            [k: string]: import('ant-design-vue/lib/form').RuleObject | import('ant-design-vue/lib/form').RuleObject[];
        };
    };
    validateMessages: {
        type: PropType<import('ant-design-vue/lib/form/interface').ValidateMessages>;
        default: import('ant-design-vue/lib/form/interface').ValidateMessages;
    };
    validateOnRuleChange: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollToFirstError: {
        default: boolean | import('scroll-into-view-if-needed').Options<any>;
        type: PropType<boolean | import('scroll-into-view-if-needed').Options<any>>;
    };
    onSubmit: {
        type: PropType<(e: Event) => void>;
        default: (e: Event) => void;
    };
    name: StringConstructor;
    validateTrigger: {
        type: PropType<string | string[]>;
        default: string | string[];
    };
    size: {
        type: PropType<import('ant-design-vue/lib/button').ButtonSize>;
        default: import('ant-design-vue/lib/button').ButtonSize;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    onValuesChange: {
        type: PropType<(changedValues: any, values: any) => void>;
        default: (changedValues: any, values: any) => void;
    };
    onFieldsChange: {
        type: PropType<(changedFields: import('ant-design-vue/lib/form/interface').FieldData[], allFields: import('ant-design-vue/lib/form/interface').FieldData[]) => void>;
        default: (changedFields: import('ant-design-vue/lib/form/interface').FieldData[], allFields: import('ant-design-vue/lib/form/interface').FieldData[]) => void;
    };
    onFinishFailed: {
        type: PropType<(errorInfo: import('ant-design-vue/lib/form/interface').ValidateErrorEntity<any>) => void>;
        default: (errorInfo: import('ant-design-vue/lib/form/interface').ValidateErrorEntity<any>) => void;
    };
    onValidate: {
        type: PropType<(name: string | number | string[] | number[], status: boolean, errors: string[]) => void>;
        default: (name: string | number | string[] | number[], status: boolean, errors: string[]) => void;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    onInit: {
        type: PropType<(values: any, form: any) => void>;
        default: undefined;
    };
    layout: import('vue-types').VueTypeDef<string>;
    labelCol: {
        type: PropType<Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes>;
        default: Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes;
    };
    wrapperCol: {
        type: PropType<Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes>;
        default: Partial<ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            sm: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            md: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            lg: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            xxl: {
                type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
                default: string | number | import('ant-design-vue/lib/grid').ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import('vue').HTMLAttributes;
    };
    colon: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelAlign: {
        type: PropType<import('ant-design-vue/lib/form/interface').FormLabelAlign>;
        default: import('ant-design-vue/lib/form/interface').FormLabelAlign;
    };
    labelWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
    prefixCls: StringConstructor;
    requiredMark: {
        type: PropType<"" | import('ant-design-vue/lib/form/Form').RequiredMark>;
        default: "" | import('ant-design-vue/lib/form/Form').RequiredMark;
    };
    hideRequiredMark: {
        type: BooleanConstructor;
        default: boolean;
    };
    model: import('vue-types').VueTypeValidableDef<{
        [key: string]: any;
    }> & {
        default: () => {
            [key: string]: any;
        };
    };
    rules: {
        type: PropType<{
            [k: string]: import('ant-design-vue/lib/form').RuleObject | import('ant-design-vue/lib/form').RuleObject[];
        }>;
        default: {
            [k: string]: import('ant-design-vue/lib/form').RuleObject | import('ant-design-vue/lib/form').RuleObject[];
        };
    };
    validateMessages: {
        type: PropType<import('ant-design-vue/lib/form/interface').ValidateMessages>;
        default: import('ant-design-vue/lib/form/interface').ValidateMessages;
    };
    validateOnRuleChange: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollToFirstError: {
        default: boolean | import('scroll-into-view-if-needed').Options<any>;
        type: PropType<boolean | import('scroll-into-view-if-needed').Options<any>>;
    };
    onSubmit: {
        type: PropType<(e: Event) => void>;
        default: (e: Event) => void;
    };
    name: StringConstructor;
    validateTrigger: {
        type: PropType<string | string[]>;
        default: string | string[];
    };
    size: {
        type: PropType<import('ant-design-vue/lib/button').ButtonSize>;
        default: import('ant-design-vue/lib/button').ButtonSize;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    onValuesChange: {
        type: PropType<(changedValues: any, values: any) => void>;
        default: (changedValues: any, values: any) => void;
    };
    onFieldsChange: {
        type: PropType<(changedFields: import('ant-design-vue/lib/form/interface').FieldData[], allFields: import('ant-design-vue/lib/form/interface').FieldData[]) => void>;
        default: (changedFields: import('ant-design-vue/lib/form/interface').FieldData[], allFields: import('ant-design-vue/lib/form/interface').FieldData[]) => void;
    };
    onFinishFailed: {
        type: PropType<(errorInfo: import('ant-design-vue/lib/form/interface').ValidateErrorEntity<any>) => void>;
        default: (errorInfo: import('ant-design-vue/lib/form/interface').ValidateErrorEntity<any>) => void;
    };
    onValidate: {
        type: PropType<(name: string | number | string[] | number[], status: boolean, errors: string[]) => void>;
        default: (name: string | number | string[] | number[], status: boolean, errors: string[]) => void;
    };
}>> & Readonly<{}>, {
    labelCol: Partial<ExtractPropTypes<{
        span: (StringConstructor | NumberConstructor)[];
        order: (StringConstructor | NumberConstructor)[];
        offset: (StringConstructor | NumberConstructor)[];
        push: (StringConstructor | NumberConstructor)[];
        pull: (StringConstructor | NumberConstructor)[];
        xs: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        sm: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        md: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        lg: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        xl: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        xxl: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        prefixCls: StringConstructor;
        flex: (StringConstructor | NumberConstructor)[];
    }>> & import('vue').HTMLAttributes;
    wrapperCol: Partial<ExtractPropTypes<{
        span: (StringConstructor | NumberConstructor)[];
        order: (StringConstructor | NumberConstructor)[];
        offset: (StringConstructor | NumberConstructor)[];
        push: (StringConstructor | NumberConstructor)[];
        pull: (StringConstructor | NumberConstructor)[];
        xs: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        sm: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        md: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        lg: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        xl: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        xxl: {
            type: PropType<string | number | import('ant-design-vue/lib/grid').ColSize>;
            default: string | number | import('ant-design-vue/lib/grid').ColSize;
        };
        prefixCls: StringConstructor;
        flex: (StringConstructor | NumberConstructor)[];
    }>> & import('vue').HTMLAttributes;
    colon: boolean;
    labelAlign: import('ant-design-vue/lib/form/interface').FormLabelAlign;
    labelWrap: boolean;
    requiredMark: "" | import('ant-design-vue/lib/form/Form').RequiredMark;
    hideRequiredMark: boolean;
    model: {
        [key: string]: any;
    };
    rules: {
        [k: string]: import('ant-design-vue/lib/form').RuleObject | import('ant-design-vue/lib/form').RuleObject[];
    };
    validateMessages: import('ant-design-vue/lib/form/interface').ValidateMessages;
    validateOnRuleChange: boolean;
    scrollToFirstError: boolean | import('scroll-into-view-if-needed').Options<any>;
    onSubmit: (e: Event) => void;
    validateTrigger: string | string[];
    size: import('ant-design-vue/lib/button').ButtonSize;
    disabled: boolean;
    onValuesChange: (changedValues: any, values: any) => void;
    onFieldsChange: (changedFields: import('ant-design-vue/lib/form/interface').FieldData[], allFields: import('ant-design-vue/lib/form/interface').FieldData[]) => void;
    onFinishFailed: (errorInfo: import('ant-design-vue/lib/form/interface').ValidateErrorEntity<any>) => void;
    onValidate: (name: string | number | string[] | number[], status: boolean, errors: string[]) => void;
    onInit: (values: any, form: any) => void;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default ProForm;
