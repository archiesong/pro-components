import { ComputedRef } from 'vue';
import { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
export interface SiderMenuToken extends ProAliasToken {
    componentCls: string;
    proLayoutCollapsedWidth: number;
}
export declare function useStylish(prefixCls: ComputedRef<string>, { stylish, proLayoutCollapsedWidth, }: {
    stylish?: GenerateStyle<SiderMenuToken>;
    proLayoutCollapsedWidth: number;
}): import('@ant-design-vue/pro-provider').UseStyleResult;
