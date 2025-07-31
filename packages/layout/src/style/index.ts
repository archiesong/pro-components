import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface ProLayoutToken extends ProAliasToken {
  componentCls: string;
}

const genProLayoutStyle: GenerateStyle<ProLayoutToken> = (token) => {
  return {
    [token.componentCls]: {
      [`&${token.antCls}-layout`]: {
        display: 'flex',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
      },
      [`${token.componentCls}-content`]: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: token.layout?.pageContainer?.colorBgPageContainer || 'transparent',
        position: 'relative',
        paddingBlock: token.layout?.pageContainer?.paddingBlockPageContainerContent,
        paddingInline: token.layout?.pageContainer?.paddingInlinePageContainerContent,
        '&-has-page-container': {
          padding: 0,
        },
      },
      [`${token.componentCls}-container`]: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        minHeight: 0,
        backgroundColor: 'transparent',
      },
      [`${token.componentCls}-wrap`]: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },
      [`${token.componentCls}-bg-list`]: {
        pointerEvents: 'none',
        position: 'fixed',
        overflow: 'hidden',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 0,
        height: '100%',
        width: '100%',
        background: token?.layout?.bgLayout,
      },
    },
  };
};

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProLayout', (token) => {
    const proLayoutToken: ProLayoutToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    };
    return [genProLayoutStyle(proLayoutToken)];
  });
}
