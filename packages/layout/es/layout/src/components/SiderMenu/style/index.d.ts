import { ComputedRef } from 'vue';
import { ProAliasToken } from '@ant-design-vue/pro-provider';
import { Keyframes } from 'ant-design-vue';
export interface SiderMenuToken extends ProAliasToken {
    componentCls: string;
    proLayoutCollapsedWidth: number;
}
export declare const proLayoutTitleHide: Keyframes;
export declare function useStyle(prefixCls: ComputedRef<string>, { proLayoutCollapsedWidth, }: {
    proLayoutCollapsedWidth: number;
}): import('@ant-design-vue/pro-provider').UseStyleResult;
