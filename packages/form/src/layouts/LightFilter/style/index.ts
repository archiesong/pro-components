import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'
import { unit } from '@antdv-next/cssinjs'

export interface ProLightFilterToken extends ProAliasToken {
  componentCls: string
}

const genProLightFilterStyle: GenerateStyle<ProLightFilterToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      lineHeight: unit(30),
      // @see https://yuque.antfin-inc.com/tech-ui/topics/523
      '&::before': {
        display: 'block',
        height: 0,
        visibility: 'hidden',
        content: '\'.\'',
      },
      '&-small': {
        lineHeight: token.lineHeight,
      },
      '&-container': {
        display: 'flex',
        flexWrap: 'wrap',
        gap: token.marginXS,
      },
      '&-item': {
        whiteSpace: 'nowrap',
        [`${token.antCls}-form-item`]: {
          marginBlock: 0,
        },
      },
      '&-line': { minWidth: 198 },
      '&-line:not(:first-child)': {
        marginBlockStart: 16,
        marginBlockEnd: 8,
      },
      '&-collapse-icon': {
        width: token.controlHeight,
        height: token.controlHeight,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '&-effective': {
        [`${token.componentCls}-collapse-icon`]: {
          backgroundColor: token.colorBgTextHover,
        },
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProLightFilter', (token) => {
    const proLightFilterToken: ProLightFilterToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProLightFilterStyle(proLightFilterToken)]
  })
}
