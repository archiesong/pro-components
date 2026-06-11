import type { GenerateStyle, ProAliasToken } from '@antdv-next/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next/pro-provider'

export interface ProToken extends ProAliasToken {
  lightCls: string
  optionCls: string
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.lightCls]: {
      color: token.colorPrimary,
    },
    [token.optionCls]: {
      flex: 'auto',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  }
}
export function useStyle(lightCls: ComputedRef<string>, optionCls: ComputedRef<string>) {
  return useAntdStyle('Highlight', (token) => {
    const proToken: ProToken = {
      ...token,
      lightCls: `.${lightCls.value}`,
      optionCls: `.${optionCls.value}`,
    }

    return [genProStyle(proToken)]
  })
}
