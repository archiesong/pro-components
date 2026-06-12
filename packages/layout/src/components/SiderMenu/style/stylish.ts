import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface SiderMenuToken extends ProAliasToken {
  componentCls: string
  proLayoutCollapsedWidth: number
}

export function useStylish(
  prefixCls: ComputedRef<string>,
  {
    stylish,
    proLayoutCollapsedWidth,
  }: {
    stylish?: GenerateStyle<SiderMenuToken>
    proLayoutCollapsedWidth: number
  },
) {
  return useAntdStyle('ProLayoutSiderMenuStylish', (token) => {
    const siderMenuToken: SiderMenuToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
      proLayoutCollapsedWidth,
    }
    if (!stylish)
      return []
    return [
      {
        [`${token.proComponentsCls}-basicLayout`]: {
          [`${siderMenuToken.componentCls}`]: stylish?.(siderMenuToken),
        },
      },
    ]
  })
}
