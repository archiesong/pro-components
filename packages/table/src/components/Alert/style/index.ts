import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { setAlpha, useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface ProTableAlertToken extends ProAliasToken {
  componentCls: string
}

const genProTableAlertStyle: GenerateStyle<ProTableAlertToken> = (token) => {
  return {
    [token.componentCls]: {
      marginBlockEnd: 16,
      backgroundColor: setAlpha(token.colorTextBase, 0.02),
      borderRadius: token.borderRadius,
      border: 'none',
      paddingBlock: token.paddingSM,
      paddingInline: token.paddingLG,
      color: token.colorTextTertiary,
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProTableAlert', (token) => {
    const proTableAlertToken: ProTableAlertToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProTableAlertStyle(proTableAlertToken)]
  })
}
