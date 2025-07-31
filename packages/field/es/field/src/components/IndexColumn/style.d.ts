import { ComputedRef } from 'vue';
import { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
export interface FieldIndexColumnToken extends ProAliasToken {
    componentCls: string;
}
export declare const genFieldIndexColumnStyle: GenerateStyle<FieldIndexColumnToken>;
export declare function useStyle(prefixCls: ComputedRef<string>): import('@ant-design-vue/pro-provider').UseStyleResult;
