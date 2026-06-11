import type { GenerateStyle, ProAliasToken } from '@antdv-next/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next/pro-provider'

export interface ProStepsFormToken extends ProAliasToken {
  componentCls: string
}

const genProStepsFormStyle: GenerateStyle<ProStepsFormToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      '&-container': {
        width: 'max-content',
        minWidth: 420,
        maxWidth: '100%',
        margin: 'auto',
      },
      '&-steps-container': {
        maxWidth: 1160,
        margin: 'auto',
        [`${token.antCls}-steps-vertical`]: { height: '100%' },
      },
      '&-step': {
        display: 'none',
        marginBlockStart: 32,
        '&-active': {
          display: 'block',
        },
        '> form': { maxWidth: '100%' },
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProStepsForm', (token) => {
    const proStepsFormToken: ProStepsFormToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProStepsFormStyle(proStepsFormToken)]
  })
}
