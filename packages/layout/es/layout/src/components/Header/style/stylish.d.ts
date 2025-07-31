import { ComputedRef } from 'vue';
import { ProAliasToken, GenerateStyle } from '@ant-design-vue/pro-provider';
export interface ProLayoutHeaderToken extends ProAliasToken {
    componentCls: string;
    proLayoutCollapsedWidth: number;
}
export declare function useStylish(prefixCls: ComputedRef<string>, { stylish, proLayoutCollapsedWidth, }: {
    stylish?: ComputedRef<GenerateStyle<ProLayoutHeaderToken>>;
    proLayoutCollapsedWidth: ComputedRef<number>;
}): import('@ant-design-vue/pro-provider').UseStyleResult;
