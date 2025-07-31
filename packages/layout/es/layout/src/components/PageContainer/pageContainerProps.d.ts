import { ExtractPropTypes, PropType } from 'vue';
import { SpinProps, PageHeaderProps, AffixProps, TabPaneProps, AvatarProps, TabsProps, WatermarkProps, BreadcrumbProps } from 'ant-design-vue';
import { GenerateStyle } from '@ant-design-vue/pro-provider';
import { VueNode, WithFalse } from '../../typing';
import { PageContainerToken, pageContainerToken } from './style';
import { FooterToolbarProps } from '../FooterToolbar';
import { BreadcrumbRender, PageHeaderRender } from '../../RenderTypings';
export declare const pageContainerProps: () => {
    avatar: {
        type: PropType<AvatarProps>;
        default: undefined;
    };
    /**
     * @name tabs 的列表
     */
    tabList: {
        type: PropType<(TabPaneProps & {
            key?: PropertyKey;
        })[]>;
        default: undefined;
    };
    /**
     * @name  tabActiveKey 当前选中 tab 的 key
     */
    tabActiveKey: PropType<TabsProps["activeKey"]>;
    /**
     * @name  tab 修改时触发
     */
    onTabChange: PropType<TabsProps["onChange"]>;
    /**
     * @name tab 上右边额外的区域
     */
    tabBarExtraContent: {
        type: PropType<TabsProps["tabBarExtraContent"]>;
        default: undefined;
    };
    /** @name tabs 的其他配置 */
    tabProps: {
        type: PropType<TabsProps>;
        default: undefined;
    };
    /** @name fixedHeader 固定 PageHeader 到页面顶部 */
    fixedHeader: {
        type: BooleanConstructor;
        default: undefined;
    };
    title: {
        type: PropType<false | VueNode>;
        default: undefined;
    };
    breadcrumb: {
        type: PropType<BreadcrumbProps>;
        default: undefined;
    };
    content: {
        type: PropType<WithFalse<VueNode>>;
        default: undefined;
    };
    footer: {
        type: PropType<VueNode[]>;
        default: undefined;
    };
    extraContent: {
        type: PropType<WithFalse<VueNode>>;
        default: undefined;
    };
    /**
     * @name token 自定义的 token
     */
    token: {
        type: PropType<pageContainerToken>;
        default: undefined;
    };
    /**
     * 与 Ant Design Vue 完全相同
     *
     * @name PageHeader 的配置
     */
    header: {
        type: PropType<PageHeaderProps>;
        default: undefined;
    };
    /**
     * @name pageHeaderRender 自定义 pageHeader
     */
    pageHeaderRender: {
        type: PropType<PageHeaderRender>;
        default: undefined;
    };
    /**
     * 与 Ant Design Vue 完全相同
     * @name affixProps 固钉的配置
     */
    affixProps: {
        type: PropType<AffixProps>;
        default: undefined;
    };
    /**
     * 只加载内容区域
     *
     * @name loading 是否加载
     */
    loading: {
        type: PropType<boolean | SpinProps | VueNode>;
        default: undefined;
    };
    /**
     * 自定义 breadcrumb,
     * @name breadcrumbRender 返回false不展示
     */
    breadcrumbRender: {
        type: PropType<BreadcrumbRender>;
        default: undefined;
    };
    /**
     * @name WaterMarkProps 水印的配置
     */
    waterMarkProps: {
        type: PropType<WatermarkProps>;
        default: undefined;
    };
    stylish: {
        type: PropType<GenerateStyle<PageContainerToken>>;
        default: undefined;
    };
    footerStylish: {
        type: PropType<GenerateStyle<PageContainerToken>>;
        default: undefined;
    };
    footerToolBarProps: {
        type: PropType<FooterToolbarProps>;
        default: undefined;
    };
    backIcon: {
        type: PropType<import('ant-design-vue/es/_util/type').VueNode>;
    };
    prefixCls: StringConstructor;
    subTitle: {
        type: PropType<import('ant-design-vue/es/_util/type').VueNode>;
    };
    tags: {
        type: PropType<import('ant-design-vue/es/_util/type').VueNode>;
    };
    extra: {
        type: PropType<import('ant-design-vue/es/_util/type').VueNode>;
    };
    ghost: {
        type: BooleanConstructor;
        default: any;
    };
    onBack: PropType<import('ant-design-vue/es/_util/EventInterface').MouseEventHandler>;
};
export type PageContainerProps = Partial<ExtractPropTypes<ReturnType<typeof pageContainerProps>>>;
