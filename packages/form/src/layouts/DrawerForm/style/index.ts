import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface ProDrawerFormToken extends ProAliasToken {
  componentCls: string
}

const genProDrawerFormStyle: GenerateStyle<ProDrawerFormToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      '&-sidebar-dragger': {
        width: 5,
        cursor: 'ew-resize',
        padding: '4px 0 0',
        borderTop: '1px solid transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'transparent',
        '&-min-disabled': {
          cursor: 'w-resize',
        },
        '&-max-disabled': {
          cursor: 'e-resize',
        },
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProDrawerForm', (token) => {
    const proDrawerFormToken: ProDrawerFormToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }
    return [genProDrawerFormStyle(proDrawerFormToken)]
  })
}
