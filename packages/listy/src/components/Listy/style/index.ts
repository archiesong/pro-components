import type { ComponentTokenKey, CSSObject, CSSUtil, GenStyleFn, GetDefaultToken, TokenMapKey } from '@antdv-next/cssinjs'

import type { CssUtil } from 'antdv-next/dist/_util/motion'
import type { ComponentTokenMap as AntdComponentTokenMap } from 'antdv-next/dist/theme/interface/index'
import type { AliasToken, GenerateStyle } from 'antdv-next/dist/theme/internal'
import type { ComputedRef, CSSProperties } from 'vue'
import { mergeToken, unit } from '@antdv-next/cssinjs'
import { resetComponent } from 'antdv-next/dist/style/index'
import { genStyleHooks as AntdGenStyleHooks } from 'antdv-next/dist/theme/internal'

interface ComponentTokenMap extends AntdComponentTokenMap {
  Listy?: ComponentToken
}

type FullToken<C extends TokenMapKey<ComponentTokenMap>> = AliasToken & ComponentTokenMap & ComponentTokenMap[C] & {
  componentCls: string
  prefixCls: string
  iconCls: string
  antCls: string
} & CSSUtil

export interface ComponentToken {}

export interface ListyToken extends FullToken<'Listy'> {
  /**
   * @desc 列表项内间距
   * @descEN Padding of item
   */
  itemPadding: string
  /**
   * @desc 头像右间距
   * @descEN Right margin of avatar
   */
  avatarMarginRight: CSSProperties['marginRight']
  /**
   * @desc 描述文字大小
   * @descEN Font size of description
   */
  descriptionFontSize: number
}

// export interface ListyToken extends GlobalToken {
//   componentCls: string
//   // /**
//   //  * @desc 内容宽度
//   //  * @descEN Width of content
//   //  */
//   // contentWidth: number | string
//   // /**
//   //  * @desc 大号列表项内间距
//   //  * @descEN Padding of large item
//   //  */
//   // itemPaddingLG: string
//   // /**
//   //  * @desc 小号列表项内间距
//   //  * @descEN Padding of small item
//   //  */
//   // itemPaddingSM: string
//   /**
//    * @desc 列表项内间距
//    * @descEN Padding of item
//    */
//   itemPadding: string
//   // /**
//   //  * @desc 头部区域背景色
//   //  * @descEN Background color of header
//   //  */
//   // headerBg: string
//   // /**
//   //  * @desc 底部区域背景色
//   //  * @descEN Background color of footer
//   //  */
//   // footerBg: string
//   // /**
//   //  * @desc 空文本内边距
//   //  * @descEN Padding of empty text
//   //  */
//   // emptyTextPadding: CSSProperties['padding']
//   // /**
//   //  * @desc Meta 下间距
//   //  * @descEN Margin bottom of meta
//   //  */
//   // metaMarginBottom: CSSProperties['marginBottom']
//   /**
//    * @desc 头像右间距
//    * @descEN Right margin of avatar
//    */
//   avatarMarginRight: CSSProperties['marginRight']
//   // /**
//   //  * @desc 标题下间距
//   //  * @descEN Margin bottom of title
//   //  */
//   // titleMarginBottom: CSSProperties['marginBottom']
//   /**
//    * @desc 描述文字大小
//    * @descEN Font size of description
//    */
//   descriptionFontSize: number
//   // //  /**
//   // //  * @desc 列表项类名
//   // //  * @descEN Class name of list item
//   // //  */
//   // // listBorderedCls: string;
//   // /**
//   //  * @desc 最小高度
//   //  * @descEN Minimum height
//   //  */
//   // minHeight: number | string
// }
const genBorderedStyle: GenerateStyle<ListyToken, CSSObject> = (token) => {
  return {
    [`${token.componentCls}-bordered`]: {
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
      borderRadius: token.borderRadiusLG,
      [`${token.componentCls}-header`]: {
        // borderRadius: `${token.innerCornerBorderRadius} ${token.innerCornerBorderRadius} 0 0`,
      },
    },
  }
}

const genBaseStyle: GenerateStyle<ListyToken, CSSObject> = (token) => {
  return {
    [token.componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      ['--vc-virtual-listy-scrollbar-bg' as const]: token.colorSplit,
      '*': {
        outline: 'none',
      },
      '& &-items': {
        margin: 0,
        padding: 0,
      },
      '&&-split': {
        [`${token.componentCls}-item`]: {
          borderBlockEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
          '&:last-child': {
            borderBlockEnd: 'none',
          },
        },
      },
      [`& ${token.componentCls}-item`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: token.itemPadding,
        color: token.colorText,

      },
      [`& ${token.componentCls}-item ${token.componentCls}-item-meta`]: {
        display: 'flex',
        flex: 1,
        alignItems: 'flex-start',
        maxWidth: '100%',
        '&-avatar': {
          marginInlineEnd: token.avatarMarginRight,
        },
        '&-content': {
          flex: '1 0',
          width: 0,
          color: token.colorText,
        },
        '&-title': {
          margin: `0 0 ${unit(token.marginXXS)} 0`,
          color: token.colorText,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,

          '> a': {
            color: token.colorText,
            transition: `all ${token.motionDurationSlow}`,

            '&:hover': {
              color: token.colorPrimary,
            },
          },
        },
        '&-description': {
          color: token.colorTextDescription,
          fontSize: token.descriptionFontSize,
          lineHeight: token.lineHeight,
        },
      },
      [`& ${token.componentCls}-item ${token.componentCls}-item-actions`]: {
        flex: '0 0 auto',
        marginInlineStart: token.marginXXL,
        padding: 0,
        fontSize: 0,
        listStyle: 'none',
        '& > div': {
          position: 'relative',
          display: 'inline-block',
          padding: `0 ${unit(token.paddingXS)}`,
          color: token.colorTextDescription,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          textAlign: 'center',
          '&:first-child': {
            paddingInlineStart: 0,
          },
        },
      },
    },
  }
}

function genStyleHooks<C extends TokenMapKey<ComponentTokenMap>>(component: C | [C, string], styleFn: GenStyleFn<ComponentTokenMap, AliasToken, C>, getDefaultToken?: GetDefaultToken<ComponentTokenMap, AliasToken, C>, options?: {
  resetStyle?: boolean
  resetFont?: boolean
  deprecatedTokens?: [
    ComponentTokenKey<ComponentTokenMap, AliasToken, C>,
    ComponentTokenKey<ComponentTokenMap, AliasToken, C>,
  ][]
  /**
   * Component tokens that do not need unit.
   */
  unitless?: Partial<Record<ComponentTokenKey<ComponentTokenMap, AliasToken, C>, boolean>>
  /**
   * Only use component style in client side. Ignore in SSR.
   */
  clientOnly?: boolean
  /**
   * Set order of component style.
   * @default -999
   */
  order?: number
  /**
   * Whether generate styles
   * @default true
   */
  injectStyle?: boolean
}) {
  return AntdGenStyleHooks(component as keyof AntdComponentTokenMap | [keyof AntdComponentTokenMap, string], styleFn as GenStyleFn<ComponentTokenMap, AliasToken, keyof AntdComponentTokenMap>, getDefaultToken, options as {
    resetStyle?: boolean
    resetFont?: boolean
    deprecatedTokens?: [
      ComponentTokenKey<AntdComponentTokenMap, AliasToken, keyof AntdComponentTokenMap>,
      ComponentTokenKey<AntdComponentTokenMap, AliasToken, keyof AntdComponentTokenMap>,
    ][]
    /**
     * Component tokens that do not need unit.
     */
    unitless?: Partial<Record<ComponentTokenKey<AntdComponentTokenMap, AliasToken, keyof AntdComponentTokenMap>, boolean>>
    /**
     * Only use component style in client side. Ignore in SSR.
     */
    clientOnly?: boolean
    /**
     * Set order of component style.
     * @default -999
     */
    order?: number
    /**
     * Whether generate styles
     * @default true
     */
    injectStyle?: boolean
  })
}
export function useStyle(prefixCls: ComputedRef<string>, rootCls: ComputedRef<string>) {
  const _useStyle = genStyleHooks('Listy', (token) => {
    console.log(token.Listy)
    const listyToken = mergeToken<ListyToken & CssUtil>(token, {
      itemPadding: `${unit(token.paddingContentVertical)} 0`,
      avatarMarginRight: token.padding,
      descriptionFontSize: token.fontSize,
      //   // contentWidth: 220,
      //   // itemPadding: `${unit(token.value.paddingContentVertical)} 0`,
      //   //   itemPaddingSM: `${unit(token.paddingContentVerticalSM)} ${unit(token.paddingContentHorizontal)}`,
      //   //   itemPaddingLG: `${unit(token.paddingContentVerticalLG)} ${unit(token.paddingContentHorizontalLG)}`,
      //   //   headerBg: 'transparent',
      //   //   footerBg: 'transparent',
      //   // emptyTextPadding: token.padding,
      //   // metaMarginBottom: token.padding,
      //   // avatarMarginRight: token.value.padding,
      //   // titleMarginBottom: token.paddingSM,
      //   // descriptionFontSize: token.value.fontSize,
      //   // minHeight: token.controlHeightLG,

    })
    return [genBaseStyle(listyToken), genBorderedStyle(listyToken)]
  })
  return _useStyle(prefixCls, rootCls)
}
