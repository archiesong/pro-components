import { ExtractPropTypes, PropType } from 'vue';
import { PureSettings } from '../../defaultSettings';
export declare const gridContentProps: () => {
    contentWidth: {
        type: PropType<PureSettings["contentWidth"]>;
        default: undefined;
    };
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
};
export type GridContentProps = ExtractPropTypes<ReturnType<typeof gridContentProps>>;
/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 */
declare const GridContent: import('vue').DefineComponent<ExtractPropTypes<{
    contentWidth: {
        type: PropType<PureSettings["contentWidth"]>;
        default: undefined;
    };
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import('ant-design-vue/es/_util/type').VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    contentWidth: {
        type: PropType<PureSettings["contentWidth"]>;
        default: undefined;
    };
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{}>, {
    prefixCls: string;
    contentWidth: import('../../defaultSettings').ContentWidth | undefined;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default GridContent;
