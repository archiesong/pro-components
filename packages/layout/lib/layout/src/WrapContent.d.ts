import { PropType, ExtractPropTypes } from 'vue';
import { ErrorBoundaryRender } from './RenderTypings';
export declare const wrapContentProps: () => {
    hasPageContainer: {
        type: PropType<number>;
        default: undefined;
    };
    isChildrenLayout: {
        type: PropType<boolean>;
        default: undefined;
    };
    prefixCls: PropType<string>;
    location: {
        type: PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    contentHeight: {
        type: PropType<number | string>;
        default: undefined;
    };
    errorBoundaryRender: {
        type: PropType<ErrorBoundaryRender>;
        default: undefined;
    };
    hasHeader: {
        type: PropType<boolean>;
        default: undefined;
    };
};
export type WrapContentProps = ExtractPropTypes<ReturnType<typeof wrapContentProps>>;
declare const WrapContent: import('vue').DefineComponent<ExtractPropTypes<{
    hasPageContainer: {
        type: PropType<number>;
        default: undefined;
    };
    isChildrenLayout: {
        type: PropType<boolean>;
        default: undefined;
    };
    prefixCls: PropType<string>;
    location: {
        type: PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    contentHeight: {
        type: PropType<number | string>;
        default: undefined;
    };
    errorBoundaryRender: {
        type: PropType<ErrorBoundaryRender>;
        default: undefined;
    };
    hasHeader: {
        type: PropType<boolean>;
        default: undefined;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    hasPageContainer: {
        type: PropType<number>;
        default: undefined;
    };
    isChildrenLayout: {
        type: PropType<boolean>;
        default: undefined;
    };
    prefixCls: PropType<string>;
    location: {
        type: PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    contentHeight: {
        type: PropType<number | string>;
        default: undefined;
    };
    errorBoundaryRender: {
        type: PropType<ErrorBoundaryRender>;
        default: undefined;
    };
    hasHeader: {
        type: PropType<boolean>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    contentHeight: string | number;
    location: {
        pathname: string;
    };
    isChildrenLayout: boolean;
    errorBoundaryRender: ErrorBoundaryRender;
    hasHeader: boolean;
    hasPageContainer: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default WrapContent;
