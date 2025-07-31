import { VNode, PropType, ExtractPropTypes } from 'vue';
import { GenerateStyle } from '@ant-design-vue/pro-provider';
import { FooterToolbarContentRender } from '../../RenderTypings';
import { stylishToken } from './style/stylish';
export declare const footerToolbarProps: () => {
    extra: {
        type: PropType<VNode>;
        default: undefined;
    };
    footerToolbarContentRender: {
        type: PropType<FooterToolbarContentRender>;
        default: undefined;
    };
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
    stylish: {
        type: PropType<GenerateStyle<stylishToken>>;
        default: undefined;
    };
    portalDom: {
        type: BooleanConstructor;
        default: undefined;
    };
};
export type FooterToolbarProps = Partial<ExtractPropTypes<ReturnType<typeof footerToolbarProps>>>;
declare const FooterToolbar: import('vue').DefineComponent<ExtractPropTypes<{
    extra: {
        type: PropType<VNode>;
        default: undefined;
    };
    footerToolbarContentRender: {
        type: PropType<FooterToolbarContentRender>;
        default: undefined;
    };
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
    stylish: {
        type: PropType<GenerateStyle<stylishToken>>;
        default: undefined;
    };
    portalDom: {
        type: BooleanConstructor;
        default: undefined;
    };
}>, () => import('ant-design-vue/es/_util/type').VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    extra: {
        type: PropType<VNode>;
        default: undefined;
    };
    footerToolbarContentRender: {
        type: PropType<FooterToolbarContentRender>;
        default: undefined;
    };
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
    stylish: {
        type: PropType<GenerateStyle<stylishToken>>;
        default: undefined;
    };
    portalDom: {
        type: BooleanConstructor;
        default: undefined;
    };
}>> & Readonly<{}>, {
    prefixCls: string;
    extra: VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }>;
    stylish: GenerateStyle<stylishToken>;
    footerToolbarContentRender: FooterToolbarContentRender;
    portalDom: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default FooterToolbar;
