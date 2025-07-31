import { PropType, VNode, CSSProperties, ExtractPropTypes } from 'vue';
export declare const globalFooterProps: () => {
    links: {
        type: PropType<boolean | {
            key?: string;
            title: VNode;
            href: string;
            blankTarget?: boolean;
        }[]>;
        default: undefined;
    };
    copyright: {
        type: PropType<VNode | boolean>;
        default: undefined;
    };
    style: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
    class: {
        type: StringConstructor;
        default: undefined;
    };
};
export type GlobalFooterProps = Partial<ExtractPropTypes<ReturnType<typeof globalFooterProps>>>;
declare const GlobalFooter: import('vue').DefineComponent<ExtractPropTypes<{
    links: {
        type: PropType<boolean | {
            key?: string;
            title: VNode;
            href: string;
            blankTarget?: boolean;
        }[]>;
        default: undefined;
    };
    copyright: {
        type: PropType<VNode | boolean>;
        default: undefined;
    };
    style: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
    class: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import('ant-design-vue/lib/_util/type').VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    links: {
        type: PropType<boolean | {
            key?: string;
            title: VNode;
            href: string;
            blankTarget?: boolean;
        }[]>;
        default: undefined;
    };
    copyright: {
        type: PropType<VNode | boolean>;
        default: undefined;
    };
    style: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    prefixCls: {
        type: StringConstructor;
        default: undefined;
    };
    class: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{}>, {
    prefixCls: string;
    class: string;
    style: CSSProperties;
    links: boolean | {
        key?: string;
        title: VNode;
        href: string;
        blankTarget?: boolean;
    }[];
    copyright: boolean | VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default GlobalFooter;
