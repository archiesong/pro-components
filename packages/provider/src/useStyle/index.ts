import type { CSSObject, CSSUtil } from '@antdv-next/cssinjs'
import type { GlobalToken } from 'antdv-next'
import type { VueNode } from 'antdv-next/dist/_util/type'
import type { CSSInterpolation } from 'antdv-next/dist/theme/interface/index'
import type { Ref } from 'vue'
import type { ProTokenType } from '../typing/layoutToken'
import { FastColor } from '@ant-design/fast-color'
import { genCalc, useStyleRegister } from '@antdv-next/cssinjs'
import genMaxMin from '@antdv-next/cssinjs/dist/cssinjs-utils/util/maxmin'
import { theme as antdTheme } from 'antdv-next'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, shallowRef } from 'vue'
import { useProConfig } from '../context'
import * as batToken from './token'
/**
 * 把一个颜色设置一下透明度
 * @example (#fff, 0.5) => rgba(255, 255, 255, 0.5)
 * @param baseColor {string}
 * @param alpha {number} 0-1
 * @returns rgba {string}
 */
export const setAlpha = (baseColor: string, alpha: number) => new FastColor(baseColor).setA(alpha).toRgbString()
/**
 * 把一个颜色修改一些明度
 * @example (#000, 50) => #808080
 * @param baseColor {string}
 * @param brightness {number} 0-100
 * @returns hexColor {string}
 */
export function lighten(baseColor: string, brightness: number) {
  const instance = new FastColor(baseColor)
  return instance.lighten(brightness).toHexString()
}

export type GenerateStyle<ComponentToken extends object = GlobalToken, ReturnType = CSSInterpolation> = (token: ComponentToken, ...rest: any[]) => ReturnType

function genTheme() {
  if (typeof antdTheme === 'undefined' || !antdTheme)
    return batToken
  return antdTheme
}

export const proTheme = genTheme()

export const useToken = proTheme.useToken

export interface UseStyleResult {
  wrapSSR: <T extends VueNode>(node: T) => T
  hashId: Ref<string>
}

export type ProAliasToken = GlobalToken
  & ProTokenType & {
    themeId: number
    /**
     * pro 的 className
     * @type {string}
     * @example .ant-pro
     */
    proComponentsCls: string
    /**
     * antd 的 className
     * @type {string}
     * @example .ant
     */
    antCls: string
    /**
     * antd 的 iconCls
     * @type {string}
     * @example .anticon
     */
    iconCls?: string
  } & Partial<CSSUtil>

export function resetComponent(token: ProAliasToken): CSSObject {
  return {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    color: token.colorText,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    listStyle: 'none',
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
  }
}

export function operationUnit(token: ProAliasToken): CSSObject {
  return {
  // FIXME: This use link but is a operation unit. Seems should be a colorPrimary.
  // And Typography use this to generate link style which should not do this.
    color: token.colorLink,
    outline: 'none',
    cursor: 'pointer',
    transition: `color ${token.motionDurationSlow}`,

    '&:focus, &:hover': {
      color: token.colorLinkHover,
    },

    '&:active': {
      color: token.colorLinkActive,
    },
  }
}

function hashString(input: string): string {
  let hash = 5381
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 33) ^ input.charCodeAt(i)
  }
  return (hash >>> 0).toString(36)
}

function getProTokenKey(token: ProAliasToken): string {
  try {
    // ProProvider exposes finalToken instead of useCacheToken token,
    // so build a stable key from Pro token payload directly.
    return hashString(JSON.stringify(token))
  }
  catch {
    return ''
  }
}

/**
 * 封装了一下  ant-design-vue 的 useStyle
 * @param componentName {string} 组件的名字
 * @param styleFn {GenerateStyle} 生成样式的函数
 * @returns UseStyleResult
 */
export function useStyle(componentName: string, styleFn: (token: ProAliasToken) => CSSInterpolation): UseStyleResult {
  const { token: antdToken, hashId, theme } = antdTheme.useToken()
  const config = useConfig()
  const proProvide = useProConfig()
  const lastStyleKeyRef = shallowRef('')
  const styleVersionRef = shallowRef(0)
  const unitlessCssVar = new Set<string>()
  const token = computed(() => {
    let _token = proProvide.value.token
    // 如果不在 ProProvider 里面，就用 antd 的
    if (!_token.layout) {
      _token = { ...(antdToken.value as ProAliasToken) }
    }
    _token.proComponentsCls = _token.proComponentsCls ?? `.${config.value.getPrefixCls('pro')}`
    _token.antCls = `.${config.value.getPrefixCls()}`
    _token.iconCls = _token.iconCls ?? `.${config.value.iconPrefixCls}`
    _token.calc = _token.calc ?? genCalc('css', unitlessCssVar)
    const { max, min } = genMaxMin('css')
    _token.max = _token.max ?? (max as CSSUtil['max'])
    _token.min = _token.min ?? (min as CSSUtil['min'])
    return _token
  })
  const proTokenKey = computed(() => getProTokenKey(token.value))
  // if (lastStyleKeyRef.value !== styleKey) {
  //     styleVersionRef.value = styleVersionRef.value + 1
  //     lastStyleKeyRef.value = styleKey
  //   }

  // const styleVersionRef = computed(() => {
  //   return 0
  // })

  // watchEffect(() => {
  //   if (lastStyleKeyRef.value !== styleKey.value) {
  //     console.log('styleKey.value', componentName, styleKey.value, lastStyleKeyRef.value)
  //     // styleVersionRef.value = styleVersionRef.value + 1
  //     lastStyleKeyRef.value = styleKey.value
  //   }
  // })
  useStyleRegister(computed(() => {
    const styleKey = [hashId.value, theme.value.id, token.value.themeId, proTokenKey.value].filter(Boolean).join('-')
    if (lastStyleKeyRef.value !== styleKey) {
      styleVersionRef.value = styleVersionRef.value + 1
      lastStyleKeyRef.value = styleKey
    }
    const stylePath = [componentName, styleKey, styleVersionRef.value.toString()].filter(Boolean)
    return {
      theme: theme.value,
      token: token.value,
      path: stylePath,
      nonce: () => config.value.csp?.nonce!,
      layer: {
        name: 'antd-pro',
        dependencies: ['antd'],
      },
    }
  }), () => styleFn(token.value as ProAliasToken))
  return {
    wrapSSR: <T>(node: T) => node,
    hashId: computed(() => (proProvide.value.hashed ? proProvide.value.hashId! : '')),
  }
}
