import { PropType, Ref, ExtractPropTypes } from 'vue';
import { AppItemProps, AppListProps } from './typing';
import { AppListRender } from '../../RenderTypings';
import { defaultRenderLogo } from './DefaultContent';
export declare const appsLogoComponentsProps: () => {
    prefixCls: PropType<string>;
    /** 相关品牌的列表 */
    appList: PropType<AppListProps>;
    appListRender: PropType<AppListRender>;
    /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
    onItemClick: PropType<(item: AppItemProps, popoverRef: Ref<HTMLSpanElement | null>) => void>;
};
export type AppsLogoComponentsProps = Partial<ExtractPropTypes<ReturnType<typeof appsLogoComponentsProps>>>;
declare const AppsLogoComponents: import('vue').DefineComponent<ExtractPropTypes<{
    prefixCls: PropType<string>;
    /** 相关品牌的列表 */
    appList: PropType<AppListProps>;
    appListRender: PropType<AppListRender>;
    /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
    onItemClick: PropType<(item: AppItemProps, popoverRef: Ref<HTMLSpanElement | null>) => void>;
}>, () => import('ant-design-vue/es/_util/type').VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    prefixCls: PropType<string>;
    /** 相关品牌的列表 */
    appList: PropType<AppListProps>;
    appListRender: PropType<AppListRender>;
    /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
    onItemClick: PropType<(item: AppItemProps, popoverRef: Ref<HTMLSpanElement | null>) => void>;
}>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export { defaultRenderLogo };
export default AppsLogoComponents;
