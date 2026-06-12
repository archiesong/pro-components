import type { CSSObject, CSSProperties } from '@antdv-next/cssinjs/dist/hooks/useStyleRegister'
import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { unit } from '@antdv-next/cssinjs'
import { resetComponent, useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface ProListyToken extends ProAliasToken {
  componentCls: string
  /**
   * @desc 内容宽度
   * @descEN Width of content
   */
  contentWidth: number | string
  /**
   * @desc 大号列表项内间距
   * @descEN Padding of large item
   */
  itemPaddingLG: string
  /**
   * @desc 小号列表项内间距
   * @descEN Padding of small item
   */
  itemPaddingSM: string
  /**
   * @desc 列表项内间距
   * @descEN Padding of item
   */
  itemPadding: string
  /**
   * @desc 头部区域背景色
   * @descEN Background color of header
   */
  headerBg: string
  /**
   * @desc 底部区域背景色
   * @descEN Background color of footer
   */
  footerBg: string
  /**
   * @desc 空文本内边距
   * @descEN Padding of empty text
   */
  emptyTextPadding: CSSProperties['padding']
  /**
   * @desc Meta 下间距
   * @descEN Margin bottom of meta
   */
  metaMarginBottom: CSSProperties['marginBottom']
  /**
   * @desc 头像右间距
   * @descEN Right margin of avatar
   */
  avatarMarginRight: CSSProperties['marginRight']
  /**
   * @desc 标题下间距
   * @descEN Margin bottom of title
   */
  titleMarginBottom: CSSProperties['marginBottom']
  /**
   * @desc 描述文字大小
   * @descEN Font size of description
   */
  descriptionFontSize: number
  //  /**
  //  * @desc 列表项类名
  //  * @descEN Class name of list item
  //  */
  // listBorderedCls: string;
  /**
   * @desc 最小高度
   * @descEN Minimum height
   */
  minHeight: number | string
}

function genBorderedStyle(token: ProListyToken): CSSObject {
  const listBorderedCls = `${token.componentCls}-bordered`
  // console.log(token.calc(token.borderRadius).sub(token.lineWidth).equal(), 'calc')
  // const innerCornerBorderRadius = unit(token.calc(token.borderRadiusLG).sub(token.lineWidth).equal());

  return {
    [listBorderedCls]: {
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
      borderRadius: token.borderRadiusLG,
      [`${token.componentCls}-header`]: {
        // borderRadius: `${innerCornerBorderRadius} ${innerCornerBorderRadius} 0 0`,
      },
    },
  }
}

function genResponsiveStyle(token: ProListyToken): CSSObject {
  const { componentCls, screenSM, screenMD, marginLG, marginSM, margin } = token
  return {
    [`@media screen and (max-width:${screenMD}px)`]: {
      [componentCls]: {
        [`${componentCls}-item`]: {
          [`${componentCls}-item-action`]: {
            marginInlineStart: marginLG,
          },
        },
      },

      [`${componentCls}-vertical`]: {
        [`${componentCls}-item`]: {
          [`${componentCls}-item-extra`]: {
            marginInlineStart: marginLG,
          },
        },
      },
    },

    [`@media screen and (max-width: ${screenSM}px)`]: {
      [componentCls]: {
        [`${componentCls}-item`]: {
          flexWrap: 'wrap',

          [`${componentCls}-action`]: {
            marginInlineStart: marginSM,
          },
        },
      },

      [`${componentCls}-vertical`]: {
        [`${componentCls}-item`]: {
          flexWrap: 'wrap-reverse',

          [`${componentCls}-item-main`]: {
            minWidth: token.contentWidth,
          },

          [`${componentCls}-item-extra`]: {
            margin: `auto auto ${unit(margin)}`,
          },
        },
      },
    },
  }
}

const genProListyStyle: GenerateStyle<ProListyToken> = (token) => {
  return {
    [token.componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      '*': {
        outline: 'none',
      },
      [`${token.componentCls}-header`]: {
        background: token.headerBg,
      },
      [`${token.componentCls}-sticky-header`]: {
        position: 'absolute',
        insetBlockStart: 0,
        width: '100%',
        zIndex: 1,
      },
      [`${token.componentCls}-footer`]: {
        background: token.footerBg,
      },
      [`${token.componentCls}-header, ${token.componentCls}-footer`]: {
        paddingBlock: token.paddingSM,
      },
      [`${token.componentCls}-item`]: {
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 0,
        padding: token.itemPadding,
        color: token.colorText,
        [`${token.componentCls}-item-meta`]: {
          display: 'flex',
          flex: 1,
          alignItems: 'flex-start',
          maxWidth: '100%',

          [`${token.componentCls}-item-meta-avatar`]: {
            marginInlineEnd: token.avatarMarginRight,
          },

          [`${token.componentCls}-item-meta-content`]: {
            flex: '1 0',
            width: 0,
            color: token.colorText,
          },

          [`${token.componentCls}-item-meta-title`]: {
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

          [`${token.componentCls}-item-meta-description`]: {
            color: token.colorTextDescription,
            fontSize: token.descriptionFontSize,
            lineHeight: token.lineHeight,
          },
        },

        [`${token.componentCls}-item-action`]: {
          flex: '0 0 auto',
          marginInlineStart: token.marginXXL,
          padding: 0,
          fontSize: 0,
          listStyle: 'none',

          '& > li': {
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

          [`${token.componentCls}-item-action-split`]: {
            position: 'absolute',
            insetBlockStart: '50%',
            insetInlineEnd: 0,
            width: token.lineWidth,
            // height: token.calc(token.fontHeight).sub(token.calc(token.marginXXS).mul(2)).equal(),
            transform: 'translateY(-50%)',
            backgroundColor: token.colorSplit,
          },
        },
      },
      [`&${token.componentCls}-split ${token.componentCls}-item`]: {
        borderBlockEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
        '&:last-child': {
          borderBlockEnd: 'none',
        },
      },
      [`&${token.componentCls}-lg ${token.componentCls}-item`]: {
        padding: token.itemPaddingLG,
      },
      [`&${token.componentCls}-sm ${token.componentCls}-item`]: {
        padding: token.itemPaddingSM,
      },
      // Horizontal
      [`&${token.componentCls}:not(${token.componentCls}-vertical)`]: {
        [`${token.componentCls}-item-no-flex`]: {
          [`${token.componentCls}-item-action`]: {
            float: 'right',
          },
        },
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProListy', (token) => {
    const proListyToken: ProListyToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
      contentWidth: 220,
      itemPadding: `${unit(token.paddingContentVertical)} 0`,
      itemPaddingSM: `${unit(token.paddingContentVerticalSM)} ${unit(token.paddingContentHorizontal)}`,
      itemPaddingLG: `${unit(token.paddingContentVerticalLG)} ${unit(token.paddingContentHorizontalLG)}`,
      headerBg: 'transparent',
      footerBg: 'transparent',
      emptyTextPadding: token.padding,
      metaMarginBottom: token.padding,
      avatarMarginRight: token.padding,
      titleMarginBottom: token.paddingSM,
      descriptionFontSize: token.fontSize,
      minHeight: token.controlHeightLG,
    }
    return [genProListyStyle(proListyToken), genBorderedStyle(proListyToken), genResponsiveStyle(proListyToken)]
  })
}
