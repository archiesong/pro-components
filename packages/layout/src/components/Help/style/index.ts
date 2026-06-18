import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'
import { Keyframes } from '@antdv-next/cssinjs'

export interface ProHelpToken extends ProAliasToken {
  componentCls: string
}

export const actionsInputAnimal = new Keyframes('actionsInputAnimal', {
  '0%': { width: '0px' },
  '30%': { width: '20px' },
  '100%': { width: '120px' },
})
const genProHelpStyle: GenerateStyle<ProHelpToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-popover-text': {
        color: token.colorPrimary,
        cursor: 'pointer',
        boxSizing: 'border-box',
      },
      '&-popover-content': {
        maxWidth: 300,
        height: '600px',
        maxHeight: token.calc?.('100vh').sub(200).equal(),
        overflow: 'auto',
        paddingInline: 20,
        paddingBlockStart: 24,
        paddingBlockEnd: 32,
        boxSizing: 'border-box',
      },
      '&-left-panel': {
        overflow: 'auto',
        boxSizing: 'border-box',
        borderInlineEnd: `${token?.lineWidth}px solid ${token?.colorBorderSecondary}`,
        minHeight: '648px',
        minWidth: 190,
        maxWidth: 190,
        '&-menu': {
          width: 190,
          boxSizing: 'border-box',
          minWidth: 190,
          height: 'calc(100% - 40px)',
          marginBlock: 20,
        },
      },
      '&-content': {
        '&-render': {
          paddingBlock: 20,
          paddingInline: 24,
          flex: 1,
        },
        '&-footer': {
          padding: 8,
        },
        '&-panel': {
          minWidth: 200,
          overflow: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          minHeight: 648,
          img: {
            width: '100%',
          },
        },
      },
      '&-actions': {
        display: 'flex',
        boxSizing: 'border-box',
        gap: token.marginSM,
        '&-item': {
          display: 'flex',
          boxSizing: 'border-box',
          alignItems: 'center',
          justifyItems: 'center',
          padding: 4,
          height: 24,
          minWidth: 24,
          cursor: 'pointer',
          borderRadius: token.borderRadius,
          '&:hover': {
            backgroundColor: token.colorBgTextHover,
          },
        },
        '&-input': {
          // margin: 0,
          maxWidth: 120,
          // padding: 0,
          width: 120,
          // boxSizing: 'border-box',
          // borderRadius: token.borderRadius,
          // backgroundColor: token.colorBgTextHover,
          animationName: actionsInputAnimal,
          animationDuration: '0.1s',
          animationTimingFunction: 'linear',
        },
      },
      '&-search-list-item-content': {
        flex: 'auto',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        '&-light': {
          color: token.colorPrimary,
        },
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProHelp', (token) => {
    const proHelpToken: ProHelpToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }
    return [genProHelpStyle(proHelpToken)]
  })
}
