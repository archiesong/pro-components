import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface ProFieldRadioToken extends ProAliasToken {
  componentCls: string
}

const genProFieldRadioStyle: GenerateStyle<ProFieldRadioToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-error': {
        span: {
          color: token.colorError,
        },
      },
      '&-vertical': {
        [`${token.antCls}-radio-wrapper`]: {
          display: 'flex',
          marginInlineEnd: 0,
        },
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProFieldRadio', (token) => {
    const proFieldRadioToken: ProFieldRadioToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProFieldRadioStyle(proFieldRadioToken)]
  })
}
