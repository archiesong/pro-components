import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface ProToken extends ProAliasToken {
  componentCls: string
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [`${token.componentCls}-label`]: { cursor: 'pointer' },
    [`${token.componentCls}-overlay`]: {
      minWidth: 200,
      marginBlockStart: 4,
    },
    [`${token.componentCls}-content`]: { paddingBlock: 16, paddingInline: 16 },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('FilterDropdown', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProStyle(proToken)]
  })
}
