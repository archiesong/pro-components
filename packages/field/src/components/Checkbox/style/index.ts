import type { GenerateStyle, ProAliasToken } from '@antdv-next/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next/pro-provider'

export interface ProFieldCheckboxToken extends ProAliasToken {
  componentCls: string
}

const genProFieldCheckboxStyle: GenerateStyle<ProFieldCheckboxToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-error': {
        span: {
          color: token.colorError,
        },
      },
      '&-warning': {
        span: {
          color: token.colorWarning,
        },
      },
      '&-vertical': {
        // ant design 5
        [`&${token.antCls}-checkbox-group`]: {
          display: 'inline-block',
        },
        // ant design 5
        [`${token.antCls}-checkbox-wrapper+${token.antCls}-checkbox-wrapper`]: {
          'margin-inline-start': '0  !important',
        },
        // ant design 4
        [`${token.antCls}-checkbox-group-item`]: {
          display: 'flex',
          marginInlineEnd: 0,
        },
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProFieldCheckbox', (token) => {
    const proFieldCheckboxToken: ProFieldCheckboxToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProFieldCheckboxStyle(proFieldCheckboxToken)]
  })
}
