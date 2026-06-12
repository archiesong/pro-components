import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface ProToken extends ProAliasToken {
  componentCls: string
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'inline-flex',
      alignItems: 'center',
      maxWidth: '100%',
      '&-icon': {
        display: 'block',
        marginInlineStart: 4,
        cursor: 'pointer',
        '&:hover': {
          color: token.colorPrimary,
        },
      },
      '&-title': { display: 'inline-flex', flex: '1' },
      '&-subtitle ': {
        marginInlineStart: 8,
        color: token.colorTextSecondary,
        fontWeight: 'normal',
        fontSize: token.fontSize,
        whiteSpace: 'nowrap',
      },
      '&-title-ellipsis': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'keep-all',
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('LabelIconTip', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProStyle(proToken)]
  })
}
