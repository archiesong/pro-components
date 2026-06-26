import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface SiderMenuToken extends ProAliasToken {
  componentCls: string
  proLayoutCollapsedWidth: number
  proLayoutFirstMenuWidth?: number
}

export function useStylish(
  prefixCls: ComputedRef<string>,
  {
    stylish,
    proLayoutCollapsedWidth,
    proLayoutFirstMenuWidth,
  }: {
    stylish?: GenerateStyle<SiderMenuToken>
    proLayoutCollapsedWidth: number
    proLayoutFirstMenuWidth?: number
  },
) {
  return useAntdStyle('ProLayoutSiderMenuStylish', (token) => {
    const siderMenuToken: SiderMenuToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
      proLayoutCollapsedWidth,
      proLayoutFirstMenuWidth,
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
