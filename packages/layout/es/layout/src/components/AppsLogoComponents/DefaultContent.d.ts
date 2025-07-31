import { Ref, FunctionalComponent } from 'vue';
import { AppItemProps, AppListProps } from './typing';
import { VueNode } from 'ant-design-vue/es/_util/type';
/**
 * 默认渲染logo的方式，如果是个string，用img。否则直接返回
 *
 * @param logo
 * @returns
 */
export declare const defaultRenderLogo: (logo: VueNode | (() => VueNode)) => VueNode;
declare const DefaultContent: FunctionalComponent<{
    appList?: AppListProps;
    itemClick?: (item: AppItemProps, popoverRef?: Ref<HTMLSpanElement>) => void;
    baseClassName?: string;
    hashId?: string;
}>;
export default DefaultContent;
