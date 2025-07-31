import { ComputedRef } from 'vue';
import { ProAliasToken } from '@ant-design-vue/pro-provider';
export interface GlobalFooterToken extends ProAliasToken {
    componentCls: string;
    probgLayout?: string;
}
export declare function useStyle(prefixCls: ComputedRef<string>): import('@ant-design-vue/pro-provider').UseStyleResult;
