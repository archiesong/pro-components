import type { GenerateStyle, ProAliasToken } from '@antdv-next/pro-provider'
import type { ComputedRef } from 'vue'
import { Keyframes } from '@antdv-next/cssinjs'
import { useStyle as useAntdStyle } from '@antdv-next/pro-provider'

export interface ProCheckCardGroupToken extends ProAliasToken {
  componentCls: string
}

export const cardLoading = new Keyframes('card-loading', {
  '0%': { backgroundPosition: '0 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0 50%' },
})

const genProCheckCardGroupStyle: GenerateStyle<ProCheckCardGroupToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'inline-flex',
      flexWrap: 'wrap',
      columnGap: token.margin,
      rowGap: token.margin,
      position: 'relative',
      [`${token.antCls}-row`]: {
        width: '100%',
      },
      [`${token.proComponentsCls}-card${token.proComponentsCls}-checkcard`]: {
        marginInlineEnd: 0,
        marginBlockEnd: 0,
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProCheckCardGroup', (token) => {
    const proCheckCardGroupToken: ProCheckCardGroupToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProCheckCardGroupStyle(proCheckCardGroupToken)]
  })
}
