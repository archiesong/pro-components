import { ComputedRef } from 'vue';
import { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
export interface ProListToken extends ProAliasToken {
    componentCls: string;
}
export declare const turn: import('ant-design-vue').Keyframes;
export declare const genProListStyle: GenerateStyle<ProListToken>;
export declare function useStyle(prefixCls: ComputedRef<string>): import('@ant-design-vue/pro-provider').UseStyleResult;
