import { ComputedRef } from 'vue';
import { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
export interface stylishToken extends ProAliasToken {
    componentCls: string;
}
export declare function useStylish(prefixCls: ComputedRef<string>, { stylish, }: {
    stylish?: ComputedRef<GenerateStyle<stylishToken>>;
}): import('@ant-design-vue/pro-provider').UseStyleResult;
