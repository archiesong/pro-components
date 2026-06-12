import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface ProFormListToken extends ProAliasToken {
  componentCls: string
}

const genProFormListStyle: GenerateStyle<ProFormListToken> = (token) => {
  return {
    // [`${token.antCls}-pro`]: {
    //   [`${token.antCls}-form:not(${token.antCls}-form-horizontal)`]: {
    //     [token.componentCls]: {
    //       [`&-item:not(${token.componentCls}-item-show-label)`]: {
    //         [`${token.antCls}-form-item-label`]: {
    //           display: 'none',
    //         },
    //       },
    //     },
    //   },
    // },
    [token.componentCls]: {
      maxWidth: '100%',
      boxSizing: 'border-box',
      '&-item': {
        '&&-show-label': {
          [`${token.antCls}-form-item-label`]: {
            display: 'inline-block',
          },
        },
        '&&-default:first-child': {
          'div:first-of-type': {
            [`${token.antCls}-form-item`]: {
              [`${token.antCls}-form-item-label`]: {
                display: 'inline-block',
              },
            },
          },
        },
        '&&-default:not(:first-child)': {
          'div:first-of-type': {
            [`${token.antCls}-form-item`]: {
              [`${token.antCls}-form-item-label`]: {
                display: 'none',
              },
            },
          },
        },
      },
      '&-action': {
        display: 'flex',
        height: token.controlHeight,
        marginBlockEnd: token.marginLG,
        lineHeight: `${token.controlHeight}px`,
        '&-small': {
          height: token.controlHeightSM,
          lineHeight: token.controlHeightSM,
        },
      },
      '&-action-icon': {
        marginInlineStart: 8,
        cursor: 'pointer',
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
          color: token.colorPrimaryTextHover,
        },
      },
      [`${token.proComponentsCls}-card ${token.proComponentsCls}-card-extra`]: {
        [token.componentCls]: {
          '&-action': {
            marginBlockEnd: 0,
          },
        },
      },
      '&-creator-button-top': {
        marginBlockEnd: 24,
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProFormList', (token) => {
    const proFormListToken: ProFormListToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProFormListStyle(proFormListToken)]
  })
}
