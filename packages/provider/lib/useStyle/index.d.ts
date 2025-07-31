import { Ref } from 'vue';
import { CSSInterpolation, CSSObject, theme } from 'ant-design-vue';
import { VueNode } from 'ant-design-vue/lib/_util/type';
import { GlobalToken } from 'ant-design-vue/lib/theme/interface';
import { ProTokenType } from '../typing/layoutToken';
/**
 * 把一个颜色设置一下透明度
 * @example (#fff, 0.5) => rgba(255, 255, 255, 0.5)
 * @param baseColor {string}
 * @param alpha {number} 0-1
 * @returns rgba {string}
 */
export declare const setAlpha: (baseColor: string, alpha: number) => string;
/**
 * 把一个颜色修改一些明度
 * @example (#000, 50) => #808080
 * @param baseColor {string}
 * @param brightness {number} 0-100
 * @returns hexColor {string}
 */
export declare const lighten: (baseColor: string, brightness: number) => string;
export type GenerateStyle<ComponentToken extends object = GlobalToken, ReturnType = CSSInterpolation> = (token: ComponentToken, ...rest: any[]) => ReturnType;
export type UseStyleResult = {
    wrapSSR: (node: VueNode) => VueNode;
    hashId: Ref<string>;
};
export declare const proTheme: typeof theme;
export declare const useToken: () => {
    theme: import('vue').ComputedRef<import('ant-design-vue').Theme<import('ant-design-vue/lib/theme/internal').SeedToken, import('ant-design-vue/lib/theme/interface').MapToken>>;
    token: import('vue').ComputedRef<GlobalToken>;
    hashId: import('vue').ComputedRef<string>;
};
export type ProAliasToken = GlobalToken & ProTokenType & {
    themeId: number;
    /**
     * pro 的 className
     * @type {string}
     * @example .ant-pro
     */
    proComponentsCls: string;
    /**
     * antd 的 className
     * @type {string}
     * @example .ant
     */
    antCls: string;
    /**
     * antd 的 iconCls
     * @type {string}
     * @example .anticon
     */
    iconCls?: string;
};
export declare const resetComponent: (token: ProAliasToken) => CSSObject;
/**
 * 封装了一下  ant-design-vue 的 useStyle
 * @param componentName {string} 组件的名字
 * @param styleFn {GenerateStyle} 生成样式的函数
 * @returns UseStyleResult
 */
export declare function useStyle(componentName: string, styleFn: (token: ProAliasToken) => CSSInterpolation): UseStyleResult;
