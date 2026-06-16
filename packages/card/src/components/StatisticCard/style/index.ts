import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface ProListToken extends ProAliasToken {
  componentCls: string
}

const genProStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      '&-chart': {
        display: 'flex',
        flexDirection: 'column',
        marginBlockStart: 8,
        marginBlockEnd: 8,
        '&-left': { marginBlockStart: 0, marginInlineEnd: 16 },
        '&-right': { marginBlockStart: 0, marginInlineStart: 16 },
      },
      '&-content': {
        display: 'flex',
        flexDirection: 'column',
        '&-horizontal': {
          flexDirection: 'row',
          [`${token.componentCls}-chart`]: {
            alignItems: 'center',
            alignSelf: 'flex-start',
          },
        },
      },
      '&-footer': {
        marginBlockStart: 8,
        paddingBlockStart: 8,
        borderBlockStart: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('StatisticCard', (token) => {
    const proListToken: ProListToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProStyle(proListToken)]
  })
}
