import { ComputedRef } from 'vue';
import { MenuMode } from 'ant-design-vue';
import { ProAliasToken } from '@ant-design-vue/pro-provider';
export interface ProLayoutBaseMenuToken extends ProAliasToken {
    componentCls: string;
}
export declare function useStyle(prefixCls: ComputedRef<string>, mode?: MenuMode): import('@ant-design-vue/pro-provider').UseStyleResult;
