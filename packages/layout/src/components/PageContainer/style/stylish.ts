import type { GenerateStyle, ProAliasToken } from '@antdv-next/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next/pro-provider'

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
  return useAntdStyle('ProLayoutPageContainerStylish', (token) => {
    const stylishToken: stylishToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }
    if (!stylish?.value)
      return []

    return [
      {
        [`div${stylishToken.componentCls}`]: stylish.value?.(stylishToken),
      },
    ]
  })
}
