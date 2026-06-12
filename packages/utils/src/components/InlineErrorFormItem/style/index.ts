import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface ProToken extends ProAliasToken {
  componentCls: string
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  const progressBgCls = `${token.antCls}-progress-bg`
  return {
    [token.componentCls]: {
      '&-with-help': {
        '&-multiple': {
          paddingBlockStart: 6,
          paddingBlockEnd: 12,
          paddingInline: 8,
        },
        '&-progress': {
          '&-success': {
            [progressBgCls]: {
              backgroundColor: token.colorSuccess,
            },
          },
          '&-error': {
            [progressBgCls]: {
              backgroundColor: token.colorError,
            },
          },
          '&-warning': {
            [progressBgCls]: {
              backgroundColor: token.colorWarning,
            },
          },
        },
        '&-rule': {
          display: 'flex',
          alignItems: 'center',
          '&-icon': {
            '&-default': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 14,
              height: 22,
              '&-circle': {
                width: 6,
                height: 6,
                backgroundColor: token.colorTextSecondary,
                borderRadius: 4,
              },
            },
            '&-loading': {
              color: token.colorPrimary,
            },
            '&-error': { color: token.colorError },
            '&-success': {
              color: token.colorSuccess,
            },
          },
          '&-text': {
            color: token.colorText,
          },
        },
      },

    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('InlineErrorFormItem', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }
    return [genProStyle(proToken)]
  })
}
