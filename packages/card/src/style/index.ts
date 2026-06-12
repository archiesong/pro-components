import type { CSSInterpolation } from '@antdv-next/cssinjs'
import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

interface ProCardToken extends ProAliasToken {
  componentCls: string
  gridColumns: number
}
const genProCardStyle: GenerateStyle<ProCardToken> = (token) => {
  const { componentCls } = token
  return {
    [componentCls]: {
      [`&${token.antCls}-collapse`]: {
        '&&-ghost': {
          [`${token.antCls}-collapse-item`]: {
            [`${componentCls}-header`]: {
              borderRadius: 0,
            },
            [`${token.antCls}-collapse-content`]: {
              '&-box': {
                padding: token.paddingLG,
              },
            },
          },
        },
        [`${token.antCls}-collapse-item`]: {
          '&-active': {
            [`${componentCls}-header`]: {
              transition: 'none',
              '&-border': {
                borderBlockEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
              },
            },
          },
          [`${componentCls}-header`]: {
            [`&${token.antCls}-collapse-header`]: {
              paddingBlock: 16,
              paddingInline: 24,
              [`${token.antCls}-collapse-header-text`]: {
                fontSize: token.fontSizeLG,
              },
            },
          },
        },
      },
      [`&${token.antCls}-card:not(${token.antCls}-card-bordered):not(&-box-shadow)`]: {
        boxShadow: 'none',
      },
      '&&-direction-column': {
        display: 'flex',
        flexDirection: 'column',
        [`& > ${token.antCls}-card-body`]: {
          [`${componentCls}-column`]: {
            display: 'flex',
            boxSizing: 'border-box',
            height: '100%',
            flexDirection: 'column',
          },
        },
      },
      [`&${token.antCls}-card&-ghost`]: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        [`& > ${token.antCls}-card-body`]: {
          paddingBlock: 0,
          paddingInline: 0,
          borderRadius: 0,
        },
      },
      '&-disabled': {
        backgroundColor: token.colorBgContainerDisabled,
        borderColor: token.colorBorder,
        color: token.colorTextDisabled,
        cursor: 'not-allowed',
        // [`${token.antCls}-card-head`]: {
        //   color: token.colorTextDisabled,
        //   [`${token.antCls}-card-extra`]: {
        //     color: token.colorTextDisabled,
        //   },
        // },
      },
    },
  }
}

function genLoopGridColumnsStyle(token: ProCardToken, sizeCls: string) {
  const { componentCls, gridColumns } = token
  return ((Array.from({ length: gridColumns + 1 })
    .fill(1)) as any[]).reduce((gridColumnsStyle: Record<string, any>, _, index) => {
    if (index === 0) {
      gridColumnsStyle[`${componentCls}-col${sizeCls}-${index}`] = {
        display: 'none',
      }
      gridColumnsStyle[`${componentCls}-push-${index}`] = {
        insetInlineStart: 'auto',
      }
      gridColumnsStyle[`${componentCls}-pull-${index}`] = {
        insetInlineEnd: 'auto',
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-push-${index}`] = {
        insetInlineStart: 'auto',
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-pull-${index}`] = {
        insetInlineEnd: 'auto',
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-offset-${index}`] = {
        marginInlineEnd: 0,
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-order-${index}`] = {
        order: 0,
      }
    }
    else {
      gridColumnsStyle[`${componentCls}-col${sizeCls}-${index}`] = {
        display: 'block',
        flex: `0 0 ${(index / gridColumns) * 100}%`,
        maxWidth: `${(index / gridColumns) * 100}%`,
      }
      gridColumnsStyle[`${componentCls}-col${sizeCls}-push-${index}`] = {
        insetInlineStart: `${(index / gridColumns) * 100}%`,
      }
      gridColumnsStyle[`${componentCls}-col${sizeCls}-pull-${index}`] = {
        insetInlineEnd: `${(index / gridColumns) * 100}%`,
      }
      gridColumnsStyle[`${componentCls}-col${sizeCls}-offset-${index}`] = {
        marginInlineStart: `${(index / gridColumns) * 100}%`,
      }
      gridColumnsStyle[`${componentCls}-col${sizeCls}-order-${index}`] = {
        order: index,
      }
    }
    return gridColumnsStyle
  }, {} as CSSInterpolation)
}

const genGridStyle: GenerateStyle<ProCardToken> = (token, sizeCls: string) =>
  genLoopGridColumnsStyle(token, sizeCls)

const genGridMediaStyle: GenerateStyle<ProCardToken> = (
  token,
  screenSize: number,
  sizeCls: string,
) => {
  return {
    [`@media (min-width: ${screenSize}px)`]: {
      ...(genGridStyle(token, sizeCls) as Record<string, any>),
    },
  }
}

export default function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProCard', (token) => {
    const proCardToken: ProCardToken = {
      ...token,
      gridColumns: 24,
      componentCls: `.${prefixCls.value}`,
    }
    const gridMediaSizesMap = {
      '-xs': proCardToken.screenXSMin,
      '-sm': proCardToken.screenSMMin,
      '-md': proCardToken.screenMDMin,
      '-lg': proCardToken.screenLGMin,
      '-xl': proCardToken.screenXLMin,
      '-xxl': proCardToken.screenXXLMin,
    }
    return [
      genProCardStyle(proCardToken),
      genGridStyle(proCardToken, ''),
      genGridStyle(proCardToken, '-xs'),
      (Object.keys(gridMediaSizesMap) as (keyof typeof gridMediaSizesMap)[])
        .map(key => genGridMediaStyle(proCardToken, gridMediaSizesMap[key], key))
        .reduce(
          (pre, cur) => ({ ...pre, ...(cur as Record<string, any>) }),
          {} as Record<string, any>,
        ),
    ]
  })
}
