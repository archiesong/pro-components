import type { GenerateStyle, ProAliasToken } from '@antdv-next/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next/pro-provider'

export interface ProToken extends ProAliasToken {
  componentCls: string
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      [`${token.antCls}-select`]: {
        position: 'absolute',
        width: 153,
        height: 28,
        visibility: 'hidden',
        opacity: 0,
        '&-selector': {
          height: 28,
        },
      },
      [`&${token.componentCls}-searchable`]: {
        [`${token.antCls}-select`]: {
          width: 200,
          '&-selector': {
            height: 28,
          },
        },
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('LightSelect', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProStyle(proToken)]
  })
}
