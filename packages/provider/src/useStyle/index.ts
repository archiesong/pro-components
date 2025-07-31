import type { Ref } from 'vue';
import type { CSSInterpolation, CSSObject, Theme } from 'ant-design-vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { GlobalToken } from 'ant-design-vue/es/theme/interface';
import type { ProTokenType } from '../typing/layoutToken';
import { computed } from 'vue';
import { theme, useStyleRegister } from 'ant-design-vue';
import { TinyColor } from '@ctrl/tinycolor';
import { useProConfigContextInject } from '../context';
import * as batToken from './token';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
/**
 * 把一个颜色设置一下透明度
 * @example (#fff, 0.5) => rgba(255, 255, 255, 0.5)
 * @param baseColor {string}
 * @param alpha {number} 0-1
 * @returns rgba {string}
 */
export const setAlpha = (baseColor: string, alpha: number) =>
  new TinyColor(baseColor).setAlpha(alpha).toRgbString();

/**
 * 把一个颜色修改一些明度
 * @example (#000, 50) => #808080
 * @param baseColor {string}
 * @param brightness {number} 0-100
 * @returns hexColor {string}
 */
export const lighten = (baseColor: string, brightness: number) => {
  const instance = new TinyColor(baseColor);
  return instance.lighten(brightness).toHexString();
};

export type GenerateStyle<
  ComponentToken extends object = GlobalToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken, ...rest: any[]) => ReturnType;

export type UseStyleResult = {
  wrapSSR: (node: VueNode) => VueNode;
  hashId: Ref<string>;
};

const genTheme = () => {
  if (typeof theme === 'undefined' || !theme) return batToken;
  return theme;
};

export const proTheme = genTheme() as typeof theme;

export const useToken = proTheme.useToken;

export type ProAliasToken = GlobalToken &
  ProTokenType & {
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
export const resetComponent = (token: ProAliasToken): CSSObject => ({
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  color: token.colorText,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  listStyle: 'none',
  fontFamily: token.fontFamily,
});

/**
 * 封装了一下  ant-design-vue 的 useStyle
 * @param componentName {string} 组件的名字
 * @param styleFn {GenerateStyle} 生成样式的函数
 * @returns UseStyleResult
 */
export function useStyle(
  componentName: string,
  styleFn: (token: ProAliasToken) => CSSInterpolation
): UseStyleResult {
  const proProvide = useProConfigContextInject();
  const { token: antdToken } = useToken();
  const { getPrefixCls, iconPrefixCls } = useConfigContextInject();
  const token = computed(() => {
    let _token = proProvide.value.token;
    // 如果不在 ProProvider 里面，就用 antd 的
    if (!_token.layout) {
      _token = { ...(antdToken.value as ProAliasToken) };
    }
    _token.proComponentsCls = _token.proComponentsCls ?? `.${getPrefixCls('pro')}`;
    _token.antCls = `.${getPrefixCls()}`;
    _token.iconCls = _token.iconCls ?? `.${iconPrefixCls.value}`;
    return _token;
  });
  const componentInfo = computed(() => {
    return {
      theme: proProvide.value.theme! as Theme<any, any>,
      token: token.value,
      path: [componentName],
      hashId: proProvide.value.hashId,
    };
  });
  return {
    wrapSSR: useStyleRegister(componentInfo, () => styleFn(token.value as ProAliasToken)),
    hashId: computed(() => proProvide.value.hashId as string),
  };
}
