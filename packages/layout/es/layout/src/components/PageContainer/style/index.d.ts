import { ComputedRef } from 'vue';
import { ProAliasToken } from '@ant-design-vue/pro-provider';
export interface PageContainerToken extends ProAliasToken {
    componentCls: string;
}
export type pageContainerToken = {
    paddingInlinePageContainerContent?: number;
    paddingBlockPageContainerContent?: number;
};
export declare function useStyle(prefixCls: ComputedRef<string>, componentsToken: ComputedRef<pageContainerToken | undefined>): import('@ant-design-vue/pro-provider').UseStyleResult;
