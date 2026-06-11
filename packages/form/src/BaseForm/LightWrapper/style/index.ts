import type { GenerateStyle, ProAliasToken } from '@antdv-next/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next/pro-provider'

export interface ProToken extends ProAliasToken {
  componentCls: string
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [`${token.componentCls}-collapse-label`]: {
      boxSizing: 'border-box',
      paddingInline: 1,
      paddingBlock: 1,
    },
    [`${token.componentCls}-container`]: {
      boxSizing: 'border-box',
      [`${token.antCls}-form-item`]: {
        marginBlockEnd: 0,
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('LightWrapper', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProStyle(proToken)]
  })
}
