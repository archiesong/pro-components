import type { GenerateStyle, ProAliasToken } from '@antdv-next/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next/pro-provider'

export interface ProToken extends ProAliasToken {
  componentCls: string
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBlock: 8,
      paddingInlineStart: 8,
      paddingInlineEnd: 8,
      borderBlockStart: `1px solid ${token.colorSplit}`,
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('DropdownFooter', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProStyle(proToken)]
  })
}
