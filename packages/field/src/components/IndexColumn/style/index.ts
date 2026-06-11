import type { GenerateStyle, ProAliasToken } from '@antdv-next/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next/pro-provider'

export interface ProToken extends ProAliasToken {
  componentCls: string
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '18px',
      height: '18px',
      '&-border': {
        color: '#fff',
        fontSize: '12px',
        lineHeight: '12px',
        backgroundColor: '#314659',
        borderRadius: '9px',
        '&.top-three': {
          backgroundColor: '#979797',
        },
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('IndexColumn', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProStyle(proToken)]
  })
}
