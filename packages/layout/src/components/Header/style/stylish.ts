import type { GenerateStyle, ProAliasToken } from '@antdv-next/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next/pro-provider'

export interface ProLayoutHeaderToken extends ProAliasToken {
  componentCls: string
  proLayoutCollapsedWidth: number
}
export function useStylish(
  prefixCls: ComputedRef<string>,
  {
    stylish,
    proLayoutCollapsedWidth,
  }: {
    stylish?: ComputedRef<GenerateStyle<ProLayoutHeaderToken>>
    proLayoutCollapsedWidth: ComputedRef<number>
  },
) {
  return useAntdStyle('ProLayoutHeaderStylish', (token) => {
    const stylishToken: ProLayoutHeaderToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
      proLayoutCollapsedWidth: proLayoutCollapsedWidth.value,
    }
    if (!stylish?.value)
      return []

    return [
      {
        [`div${token.proComponentsCls}-basicLayout`]: {
          [`${stylishToken.componentCls}`]: stylish.value?.(stylishToken),
        },
      },
    ]
  })
}
