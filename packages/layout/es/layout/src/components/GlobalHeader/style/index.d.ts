import { ComputedRef } from 'vue';
import { ProAliasToken } from '@ant-design-vue/pro-provider';
export interface GlobalHeaderToken extends ProAliasToken {
    componentCls: string;
}
export declare function useStyle(prefixCls: ComputedRef<string>): import('@ant-design-vue/pro-provider').UseStyleResult;
