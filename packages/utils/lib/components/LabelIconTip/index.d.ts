import { PropType } from 'vue';
import { VueNode } from 'ant-design-vue/lib/_util/type';
import { LabelTooltipType } from '../../typing';
declare const LabelIconTip: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    label: {
        type: PropType<VueNode>;
        default: undefined;
    };
    subTitle: {
        type: PropType<VueNode>;
        default: undefined;
    };
    tooltip: {
        type: PropType<LabelTooltipType>;
        default: undefined;
    };
    ellipsis: {
        type: PropType<boolean | {
            showTitle?: boolean;
        }>;
        default: undefined;
    };
}>, () => VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    label: {
        type: PropType<VueNode>;
        default: undefined;
    };
    subTitle: {
        type: PropType<VueNode>;
        default: undefined;
    };
    tooltip: {
        type: PropType<LabelTooltipType>;
        default: undefined;
    };
    ellipsis: {
        type: PropType<boolean | {
            showTitle?: boolean;
        }>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    label: VueNode;
    tooltip: LabelTooltipType;
    ellipsis: boolean | {
        showTitle?: boolean;
    };
    subTitle: VueNode;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default LabelIconTip;
