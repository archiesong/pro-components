import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface stylishToken extends ProAliasToken {
  componentCls: string
}

export function useStylish(
  prefixCls: ComputedRef<string>,
  {
    stylish,
  }: {
    stylish?: ComputedRef<GenerateStyle<stylishToken>>
  },
) {
  return useAntdStyle('ProLayoutFooterToolbarStylish', (token) => {
    const stylishToken: stylishToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }
    if (!stylish?.value)
      return []

    return [
      {
        [`${stylishToken.componentCls}`]: stylish.value?.(stylishToken),
      },
    ]
  })
}
