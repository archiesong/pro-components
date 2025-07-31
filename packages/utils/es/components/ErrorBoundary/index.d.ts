import { PropType } from 'vue';
import { VueNode } from 'ant-design-vue/es/_util/type';
declare const ErrorBoundary: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    fallback: {
        type: PropType<(error: Error, info: string) => VueNode>;
        default: undefined;
    };
    onError: {
        type: FunctionConstructor;
        default: undefined;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "errorCaptured"[], "errorCaptured", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    fallback: {
        type: PropType<(error: Error, info: string) => VueNode>;
        default: undefined;
    };
    onError: {
        type: FunctionConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onErrorCaptured?: ((...args: any[]) => any) | undefined;
}>, {
    onError: Function;
    fallback: (error: Error, info: string) => VueNode;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default ErrorBoundary;
